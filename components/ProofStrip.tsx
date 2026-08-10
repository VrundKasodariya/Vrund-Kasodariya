"use client";

import { useEffect, useState } from "react";

type CodingStatsResponse = {
  totalProblemsSolved: number | string;
};

const staticProofPoints = [
  ["Kafka/gRPC", "microservice flows"],
  ["Auth/API", "backend fundamentals"],
  ["Docker", "local systems setup"]
];

export function ProofStrip() {
  const [totalSolved, setTotalSolved] = useState<number | string>("syncing");

  useEffect(() => {
    let cancelled = false;

    async function loadTotal() {
      try {
        const response = await fetch("/api/coding-stats");
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as CodingStatsResponse;
        if (!cancelled) {
          setTotalSolved(data.totalProblemsSolved);
        }
      } catch {
        // Keep exact emergency total visible if the stats route is unavailable.
      }
    }

    loadTotal();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="grid border-y border-line bg-[#060806] sm:grid-cols-4">
      <div className="border-b border-line p-4 sm:border-b-0 sm:border-r">
        <p className="text-sm font-semibold text-white">{totalSolved}</p>
        <p className="mt-1 text-xs text-slate-500">Codolio tracked solves</p>
      </div>
      {staticProofPoints.map(([value, label]) => (
        <div
          key={label}
          className="border-b border-line p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
        >
          <p className="text-sm font-semibold text-white">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{label}</p>
        </div>
      ))}
    </div>
  );
}
