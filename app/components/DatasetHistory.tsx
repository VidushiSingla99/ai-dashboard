"use client";

import { useEffect, useState } from "react";

type Dataset = {
  id: string;
  fileName: string;
  rowCount: number;
  createdAt: string;
};

export default function DatasetHistory() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);

  const [loading, setLoading] = useState(true);

  async function fetchDatasets() {
    try {
      const response = await fetch("/api/datasets/list");

      const data = await response.json();

      setDatasets(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDatasets();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white p-6">
        Loading datasets...
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6">

      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Uploaded Datasets
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Your recently uploaded CSV files.
        </p>
      </div>

      {datasets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
          No datasets uploaded yet.
        </div>
      ) : (
        <div className="space-y-3">
          {datasets.map((dataset) => (
            <div
              key={dataset.id}
              className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 transition hover:bg-gray-50"
            >
              <div>
                <h3 className="font-medium text-black">
                  {dataset.fileName}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {dataset.rowCount} rows
                </p>
              </div>

              <div className="text-sm text-gray-400">
                {new Date(dataset.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}