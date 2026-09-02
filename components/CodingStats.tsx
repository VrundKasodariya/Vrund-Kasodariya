"use client";

import { useEffect, useMemo, useState } from "react";

type StatValue = number | string;

type CodingStatsPayload = {
  totalProblemsSolved: StatValue;
  leetcode: {
    problemsSolved: StatValue;
    contestRating: StatValue;
    maxRating: StatValue;
    profileUrl: string;
  };
  codeforces: {
    currentRating: StatValue;
    maxRating: StatValue;
    problemsSolved: StatValue;
    profileUrl: string;
  };
  codechef: {
    currentRating: StatValue;
    maxRating: StatValue;
    problemsSolved: StatValue;
    profileUrl: string;
  };
  codolio: {
    profileUrl: string;
  };
  lastUpdated: string;
  source: "codolio" | "mixed" | "fallback";
  cacheStatus: "fresh" | "previous" | "emergency";
};

const STATS_STORAGE_KEY = "vrund-coding-stats-cache";

const fallbackStats: CodingStatsPayload = {
  totalProblemsSolved: 731,
  leetcode: {
    problemsSolved: 314,
    contestRating: 1339,
    maxRating: 1438,
    profileUrl: "https://leetcode.com/u/Vrund_Kasodariya/"
  },
  codeforces: {
    currentRating: 908,
    maxRating: 1028,
    problemsSolved: 107,
    profileUrl: "https://codeforces.com/profile/vrund"
  },
  codechef: {
    currentRating: 1139,
    maxRating: 1247,
    problemsSolved: 215,
    profileUrl: "https://www.codechef.com/users/vrund3395"
  },
  codolio: {
    profileUrl: "https://codolio.com/profile/Vrund"
  },
  lastUpdated: "",
  source: "fallback",
  cacheStatus: "emergency"
};

function isCodingStatsPayload(value: unknown): value is CodingStatsPayload {
  return (
    typeof value === "object" &&
    value !== null &&
    "totalProblemsSolved" in value &&
    "leetcode" in value &&
    "codeforces" in value &&
    "codechef" in value &&
    "codolio" in value
  );
}

function Metric({ label, value }: { label: string; value: StatValue }) {
  return (
    <div>
      <p className="text-[0.68rem] uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold tracking-tight text-electric">
        {value}
      </p>
    </div>
  );
}

export function CodingStats() {
  const [stats, setStats] = useState<CodingStatsPayload>(fallbackStats);

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      try {
        const cached = window.localStorage.getItem(STATS_STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as unknown;
          if (!cancelled && isCodingStatsPayload(parsed)) {
            setStats({
              ...parsed,
              cacheStatus:
                parsed.cacheStatus === "fresh" ? "previous" : parsed.cacheStatus
            });
          }
        }
      } catch {
        window.localStorage.removeItem(STATS_STORAGE_KEY);
      }

      try {
        const response = await fetch("/api/coding-stats");
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as CodingStatsPayload;
        if (!cancelled) {
          setStats(data);
          if (data.cacheStatus !== "emergency") {
            window.localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(data));
          }
        }
      } catch {
        // Static fallback stays visible if external profiles are unavailable.
      }
    }

    loadStats();

    return () => {
      cancelled = true;
    };
  }, []);

  const platformCards = useMemo(
    () => [
      {
        label: "LeetCode",
        href: stats.leetcode.profileUrl,
        ariaLabel: "Open Vrund Kasodariya LeetCode profile",
        metrics: [
          ["Solved", stats.leetcode.problemsSolved],
          ["Rating", stats.leetcode.contestRating],
          ["Max", stats.leetcode.maxRating]
        ]
      },
      {
        label: "Codeforces",
        href: stats.codeforces.profileUrl,
        ariaLabel: "Open Vrund Kasodariya Codeforces profile",
        metrics: [
          ["Solved", stats.codeforces.problemsSolved],
          ["Rating", stats.codeforces.currentRating],
          ["Max", stats.codeforces.maxRating]
        ]
      },
      {
        label: "CodeChef",
        href: stats.codechef.profileUrl,
        ariaLabel: "Open Vrund Kasodariya CodeChef profile",
        metrics: [
          ["Solved", stats.codechef.problemsSolved],
          ["Rating", stats.codechef.currentRating],
          ["Max", stats.codechef.maxRating]
        ]
      }
    ],
    [stats]
  );

  const lastUpdated = stats.lastUpdated
    ? new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(new Date(stats.lastUpdated))
    : "pending first sync";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="surface rounded-lg p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
            Total solved
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-electric">
            {stats.totalProblemsSolved}
          </p>
          <a
            href={stats.codolio.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Vrund Kasodariya Codolio profile"
            className="mt-4 inline-flex rounded border border-linkblue/35 px-2.5 py-1.5 text-xs font-semibold text-linkblue transition hover:border-linkblue/70 hover:bg-linkblue/10"
          >
            View Codolio profile
          </a>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {platformCards.map((platform) => (
            <a
              key={platform.label}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform.ariaLabel}
              className="rounded border border-line bg-[#070907] p-4 transition hover:border-electric/45 hover:bg-[#0a0d0a]"
            >
              <p className="mb-4 border-b border-line pb-3 text-sm font-semibold text-white">
                {platform.label}
              </p>
              <div className="space-y-3">
                {platform.metrics.map(([label, value]) => (
                  <Metric key={label} label={String(label)} value={value} />
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <span>Auto-updated periodically</span>
        <span>
          Source: {stats.source} | Cache: {stats.cacheStatus} | Last updated:{" "}
          {lastUpdated}
        </span>
      </div>
    </div>
  );
}
