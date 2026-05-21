"use client";

import { useEffect, useState } from "react";

import ChartRenderer from "./ChartRenderer";

import { aggregateAverage } from "@/lib/aggregateData";

type Dataset = {
  headers: string[];
  data: Record<string, string>[];
};

type Suggestion = {
  title: string;
  xAxis: string;
  yAxis: string;
};

export default function AutoCharts() {
  const [dataset, setDataset] =
    useState<Dataset | null>(null);

  const [suggestions, setSuggestions] =
    useState<Suggestion[]>([]);

  async function fetchData() {
    const datasetRes = await fetch(
      "/api/datasets/latest"
    );

    const datasetData = await datasetRes.json();

    setDataset(datasetData);

    const suggestionsRes = await fetch(
      "/api/datasets/suggestions"
    );

    const suggestionsData =
      await suggestionsRes.json();

    setSuggestions(
      suggestionsData.suggestions || []
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!dataset || !dataset.data) {
    return null;
  }

  return (
    <div className="space-y-6">
      {suggestions.map((suggestion, index) => {
        const chartData = aggregateAverage(
          dataset.data,
          suggestion.xAxis,
          suggestion.yAxis
        );

        return (
          <ChartRenderer
            key={index}
            title={suggestion.title}
            data={chartData}
            xAxis={suggestion.xAxis}
            yAxis={suggestion.yAxis}
          />
        );
      })}
    </div>
  );
}