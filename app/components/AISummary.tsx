"use client";

import { useEffect, useState } from "react";

export default function AISummary() {
  const [summary, setSummary] = useState("");

  const [loading, setLoading] = useState(true);

  async function fetchSummary() {
    try {
      const response = await fetch(
        "/api/datasets/summary"
      );

      const data = await response.json();

      setSummary(data.summary);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6">

      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">
          AI Dataset Summary
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          AI-generated insights from your dataset.
        </p>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">
          Generating insights...
        </div>
      ) : (
        <div className="prose prose-sm max-w-none whitespace-pre-wrap text-gray-700">
          {summary}
        </div>
      )}
    </div>
  );
}