"use client";

import { useEffect, useState } from "react";

type Suggestion = {
  type: string;
  title: string;
  xAxis: string;
  yAxis: string;
};

export default function ChartSuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  async function fetchSuggestions() {
    try {
      const response = await fetch(
        "/api/datasets/suggestions"
      );

      const data = await response.json();

      setSuggestions(data.suggestions || []);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6">

      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">
          AI Chart Suggestions
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Automatically generated insights based on your data.
        </p>
      </div>

      {suggestions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
          No chart suggestions available.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 p-5 transition hover:bg-gray-50"
            >
              <div className="mb-3 inline-flex rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                {suggestion.type.toUpperCase()}
              </div>

              <h3 className="text-lg font-semibold">
                {suggestion.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                X-Axis:
                <span className="ml-1 font-medium text-black">
                  {suggestion.xAxis}
                </span>
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Y-Axis:
                <span className="ml-1 font-medium text-black">
                  {suggestion.yAxis}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}