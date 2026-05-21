"use client";

import { useRef } from "react";

export default function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    // Read CSV text
    const text = await file.text();

    // Send to API
    const response = await fetch("/api/datasets/upload", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        fileName: file.name,
        csvText: text,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      alert("Dataset uploaded successfully!");
    } else {
      alert("Upload failed");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center">

      <div className="mb-4 h-14 w-14 rounded-2xl bg-black" />

      <h2 className="text-xl font-semibold tracking-tight">
        Upload CSV File
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Upload your dataset to generate insights and charts.
      </p>

      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="mt-6 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Choose CSV File
      </button>
    </div>
  );
}