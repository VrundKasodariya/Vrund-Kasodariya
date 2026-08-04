import { NextResponse } from "next/server";

const CODOLIO_PROFILE = "https://codolio.com/profile/Vrund";
const CODOLIO_API = "https://api.codolio.com/profile?userKey=Vrund";
const CODOLIO_DETAILS_API = "https://api.codolio.com/user/details?userKey=Vrund";
const LEETCODE_PROFILE = "https://leetcode.com/u/Vrund_Kasodariya/";
const CODEFORCES_PROFILE = "https://codeforces.com/profile/vrund";
const CODECHEF_PROFILE = "https://www.codechef.com/users/vrund3395";
const REVALIDATE_SECONDS = 60 * 60 * 6;
const FETCH_TIMEOUT_MS = 8000;
const MEMORY_CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 14;
const PERSISTENT_CACHE_KEY = "vrund:coding-stats:last-good";

export const dynamic = "force-dynamic";
export const revalidate = 21600;

type StatValue = number | string;

type PlatformStats = {
  problemsSolved: StatValue;
  currentRating?: StatValue;
  contestRating?: StatValue;
  maxRating: StatValue;
  profileUrl: string;
};

type CodingStats = {
  totalProblemsSolved: StatValue;
  leetcode: PlatformStats & { contestRating: StatValue };
  codeforces: PlatformStats & { currentRating: StatValue };
  codechef: PlatformStats & { currentRating: StatValue };
  codolio: {
    profileUrl: string;
  };
  lastUpdated: string;
  source: "codolio" | "mixed" | "fallback";
  cacheStatus: "fresh" | "previous" | "emergency";
};

declare global {
  // eslint-disable-next-line no-var
  var codingStatsPreviousValue:
    | { stats: CodingStats; savedAt: number }
    | undefined;
}

type CodolioPlatform = {
  platform?: string;
  totalQuestionStats?: {
    totalQuestionCounts?: number | null;
  } | null;
  userStats?: {
    currentRating?: number | null;
    maxRating?: number | null;
  } | null;
};

const fallbackStats: CodingStats = {
  totalProblemsSolved: 731,
  leetcode: {
    problemsSolved: 314,
    contestRating: 1339,
    maxRating: 1438,
    profileUrl: LEETCODE_PROFILE
  },
  codeforces: {
    problemsSolved: 107,
    currentRating: 908,
    maxRating: 1028,
    profileUrl: CODEFORCES_PROFILE
  },
  codechef: {
    problemsSolved: 215,
    currentRating: 1139,
    maxRating: 1247,
    profileUrl: CODECHEF_PROFILE
  },
  codolio: {
    profileUrl: CODOLIO_PROFILE
  },
  lastUpdated: "",
  source: "fallback",
  cacheStatus: "emergency"
};

function rememberStats(stats: CodingStats) {
  globalThis.codingStatsPreviousValue = {
    stats,
    savedAt: Date.now()
  };
}

function getPreviousStats() {
  const cache = globalThis.codingStatsPreviousValue;

  if (!cache || Date.now() - cache.savedAt > MEMORY_CACHE_TTL_MS) {
    return null;
  }

  return {
    ...cache.stats,
    source: cache.stats.source,
    cacheStatus: "previous" as const
  };
}

function createTimeoutSignal() {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return controller.signal;
}

function numberOrFallback(value: unknown, fallback: StatValue) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function isCodingStats(value: unknown): value is CodingStats {
  return (
    typeof value === "object" &&
    value !== null &&
    "totalProblemsSolved" in value &&
    "leetcode" in value &&
    "codeforces" in value &&
    "codechef" in value &&
    "codolio" in value &&
    "lastUpdated" in value &&
    "source" in value
  );
}

function getPersistentCacheConfig() {
  const url =
    process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  return url && token ? { url, token } : null;
}

async function readPersistentStats() {
  const config = getPersistentCacheConfig();

  if (!config) {
    return null;
  }

  try {
    const response = await fetch(
      `${config.url}/get/${encodeURIComponent(PERSISTENT_CACHE_KEY)}`,
      {
        headers: {
          authorization: `Bearer ${config.token}`
        },
        cache: "no-store",
        signal: createTimeoutSignal()
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { result?: unknown };
    const parsed =
      typeof data.result === "string" ? JSON.parse(data.result) : data.result;

    if (!isCodingStats(parsed)) {
      return null;
    }

    return {
      ...parsed,
      cacheStatus: "previous" as const
    };
  } catch {
    return null;
  }
}

async function writePersistentStats(stats: CodingStats) {
  const config = getPersistentCacheConfig();

  if (!config || stats.cacheStatus === "emergency") {
    return;
  }

  try {
    await fetch(`${config.url}/set/${encodeURIComponent(PERSISTENT_CACHE_KEY)}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${config.token}`,
        "content-type": "text/plain"
      },
      body: JSON.stringify(stats),
      cache: "no-store",
      signal: createTimeoutSignal()
    });
  } catch {
    // Persistent cache is optional; runtime and browser caches still work.
  }
}

async function fetchCodolioStats() {
  try {
    const [response, detailsResponse] = await Promise.all([
      fetch(CODOLIO_API, {
        next: { revalidate: REVALIDATE_SECONDS },
        signal: createTimeoutSignal()
      }),
      fetch(CODOLIO_DETAILS_API, {
        next: { revalidate: REVALIDATE_SECONDS },
        signal: createTimeoutSignal()
      }).catch(() => null)
    ]);

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as {
      status?: { success?: boolean };
      data?: {
        platformProfiles?: {
          platformProfiles?: CodolioPlatform[];
        };
      };
    };

    const detailsJson = detailsResponse?.ok
      ? ((await detailsResponse.json()) as {
          data?: { codolioCardDetails?: { totalQuestionsSolved?: number } };
        })
      : null;

    if (!json.status?.success) {
      return null;
    }

    const platforms =
      json.data?.platformProfiles?.platformProfiles?.reduce<
        Record<string, CodolioPlatform>
      >((acc, platform) => {
        if (platform.platform) {
          acc[platform.platform.toLowerCase()] = platform;
        }
        return acc;
      }, {}) ?? {};

    const leetcode = platforms.leetcode;
    const codeforces = platforms.codeforces;
    const codechef = platforms.codechef;

    const leetcodeSolved = numberOrFallback(
      leetcode?.totalQuestionStats?.totalQuestionCounts,
      fallbackStats.leetcode.problemsSolved
    );
    const codeforcesSolved = numberOrFallback(
      codeforces?.totalQuestionStats?.totalQuestionCounts,
      fallbackStats.codeforces.problemsSolved
    );
    const codechefSolved = numberOrFallback(
      codechef?.totalQuestionStats?.totalQuestionCounts,
      fallbackStats.codechef.problemsSolved
    );

    const numericSolved = [leetcodeSolved, codeforcesSolved, codechefSolved].filter(
      (value): value is number => typeof value === "number"
    );

    return {
      totalProblemsSolved: numberOrFallback(
        detailsJson?.data?.codolioCardDetails?.totalQuestionsSolved,
        numericSolved.length > 0
          ? numericSolved.reduce((total, value) => total + value, 0)
          : fallbackStats.totalProblemsSolved
      ),
      leetcode: {
        problemsSolved: leetcodeSolved,
        contestRating: numberOrFallback(
          leetcode?.userStats?.currentRating,
          fallbackStats.leetcode.contestRating
        ),
        maxRating: numberOrFallback(
          leetcode?.userStats?.maxRating,
          fallbackStats.leetcode.maxRating
        ),
        profileUrl: LEETCODE_PROFILE
      },
      codeforces: {
        problemsSolved: codeforcesSolved,
        currentRating: numberOrFallback(
          codeforces?.userStats?.currentRating,
          fallbackStats.codeforces.currentRating
        ),
        maxRating: numberOrFallback(
          codeforces?.userStats?.maxRating,
          fallbackStats.codeforces.maxRating
        ),
        profileUrl: CODEFORCES_PROFILE
      },
      codechef: {
        problemsSolved: codechefSolved,
        currentRating: numberOrFallback(
          codechef?.userStats?.currentRating,
          fallbackStats.codechef.currentRating
        ),
        maxRating: numberOrFallback(
          codechef?.userStats?.maxRating,
          fallbackStats.codechef.maxRating
        ),
        profileUrl: CODECHEF_PROFILE
      },
      codolio: {
        profileUrl: CODOLIO_PROFILE
      },
      lastUpdated: new Date().toISOString(),
      source: "codolio" as const,
      cacheStatus: "fresh" as const
    };
  } catch {
    return null;
  }
}

async function fetchCodeforcesFallback() {
  let updated = false;
  const result = {
    currentRating: fallbackStats.codeforces.currentRating,
    maxRating: fallbackStats.codeforces.maxRating,
    problemsSolved: fallbackStats.codeforces.problemsSolved
  };

  try {
    const [infoResponse, statusResponse] = await Promise.all([
      fetch("https://codeforces.com/api/user.info?handles=vrund", {
        next: { revalidate: REVALIDATE_SECONDS },
        signal: createTimeoutSignal()
      }),
      fetch("https://codeforces.com/api/user.status?handle=vrund", {
        next: { revalidate: REVALIDATE_SECONDS },
        signal: createTimeoutSignal()
      })
    ]);

    if (infoResponse.ok) {
      const info = (await infoResponse.json()) as {
        result?: Array<{ rating?: number; maxRating?: number }>;
      };
      result.currentRating = numberOrFallback(
        info.result?.[0]?.rating,
        result.currentRating
      );
      result.maxRating = numberOrFallback(
        info.result?.[0]?.maxRating,
        result.maxRating
      );
      updated = true;
    }

    if (statusResponse.ok) {
      const submissions = (await statusResponse.json()) as {
        result?: Array<{
          verdict?: string;
          problem?: {
            contestId?: number;
            index?: string;
            name?: string;
          };
        }>;
      };
      const solved = new Set<string>();
      submissions.result?.forEach((submission) => {
        if (submission.verdict !== "OK" || !submission.problem) {
          return;
        }
        const { contestId = "unknown", index = "", name = "" } = submission.problem;
        solved.add(`${contestId}-${index}-${name}`);
      });
      result.problemsSolved = solved.size || result.problemsSolved;
      updated = solved.size > 0 || updated;
    }
  } catch {
    return { ...result, updated };
  }

  return { ...result, updated };
}

async function fetchLeetCodeFallback() {
  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        referer: LEETCODE_PROFILE
      },
      body: JSON.stringify({
        query: `
          query userProblemsSolved($username: String!) {
            matchedUser(username: $username) {
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              userContestRanking {
                rating
              }
              userContestRankingHistory {
                rating
              }
            }
          }
        `,
        variables: { username: "Vrund_Kasodariya" }
      }),
      next: { revalidate: REVALIDATE_SECONDS },
      signal: createTimeoutSignal()
    });

    if (!response.ok) {
      return { ...fallbackStats.leetcode, updated: false };
    }

    const data = (await response.json()) as {
      data?: {
        matchedUser?: {
          submitStatsGlobal?: {
            acSubmissionNum?: Array<{ difficulty?: string; count?: number }>;
          };
          userContestRanking?: { rating?: number } | null;
          userContestRankingHistory?: Array<{ rating?: number }> | null;
        };
      };
    };

    const user = data.data?.matchedUser;
    const all = user?.submitStatsGlobal?.acSubmissionNum?.find(
      (item) => item.difficulty === "All"
    );
    const maxRating = user?.userContestRankingHistory
      ?.map((item) => item.rating)
      .filter((rating): rating is number => typeof rating === "number")
      .reduce<number | null>(
        (max, rating) => (max === null || rating > max ? rating : max),
        null
      );

    return {
      problemsSolved: numberOrFallback(
        all?.count,
        fallbackStats.leetcode.problemsSolved
      ),
      contestRating: numberOrFallback(
        user?.userContestRanking?.rating,
        fallbackStats.leetcode.contestRating
      ),
      maxRating: numberOrFallback(maxRating, fallbackStats.leetcode.maxRating),
      profileUrl: LEETCODE_PROFILE,
      updated: true
    };
  } catch {
    return { ...fallbackStats.leetcode, updated: false };
  }
}

export async function GET() {
  const codolioStats = await fetchCodolioStats();

  if (codolioStats) {
    rememberStats(codolioStats);
    await writePersistentStats(codolioStats);
    return NextResponse.json(codolioStats satisfies CodingStats, {
      headers: {
        "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${REVALIDATE_SECONDS}`
      }
    });
  }

  const previousStats = getPreviousStats() ?? (await readPersistentStats());

  if (previousStats) {
    rememberStats(previousStats);
    return NextResponse.json(previousStats satisfies CodingStats, {
      headers: {
        "Cache-Control": `public, s-maxage=300, stale-while-revalidate=${REVALIDATE_SECONDS}`
      }
    });
  }

  const [leetcode, codeforces] = await Promise.all([
    fetchLeetCodeFallback(),
    fetchCodeforcesFallback()
  ]);

  const { updated: leetcodeUpdated, ...leetcodeStats } = leetcode;
  const { updated: codeforcesUpdated, ...codeforcesStats } = codeforces;

  const source = leetcodeUpdated || codeforcesUpdated ? "mixed" : "fallback";

  const mixedStats: CodingStats = {
    totalProblemsSolved: fallbackStats.totalProblemsSolved,
    leetcode: leetcodeStats,
    codeforces: {
      ...codeforcesStats,
      profileUrl: CODEFORCES_PROFILE
    },
    codechef: fallbackStats.codechef,
    codolio: fallbackStats.codolio,
    lastUpdated: new Date().toISOString(),
    source,
    cacheStatus: source === "mixed" ? "fresh" : "emergency"
  };

  if (source === "mixed") {
    rememberStats(mixedStats);
    await writePersistentStats(mixedStats);
  }

  return NextResponse.json(mixedStats, {
    headers: {
      "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${REVALIDATE_SECONDS}`
    }
  });
}
