"use client";

import { useEffect, useState } from "react";

type Dataset = {
  id: string;
  fileName: string;
  headers: string[];
  data: Record<string, string>[];
};

export default function DatasetPreview() {
  const [dataset, setDataset] = useState<Dataset | null>(null);

  const [loading, setLoading] = useState(true);

  async function fetchDataset() {
    try {
      const response = await fetch("/api/datasets/latest");

      const data = await response.json();

      setDataset(data);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDataset();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white p-6">
        Loading dataset preview...
      </div>
    );
  }

  if (!dataset || !dataset.data) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white p-6">
        No dataset preview available.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6">

      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Dataset Preview
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Showing first few rows from:
          <span className="ml-1 font-medium text-black">
            {dataset.fileName}
          </span>
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200">

        <table className="min-w-full border-collapse">

          <thead className="bg-gray-50">
            <tr>
              {dataset.headers.map((header) => (
                <th
                  key={header}
                  className="border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {dataset.data.slice(0, 5).map((row, index) => (
              <tr
                key={index}
                className="transition hover:bg-gray-50"
              >
                {dataset.headers.map((header) => (
                  <td
                    key={header}
                    className="border-b border-gray-100 px-4 py-3 text-sm text-gray-600"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}