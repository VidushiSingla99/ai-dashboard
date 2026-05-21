import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome to AI Dashboard 🚀
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Upload datasets, generate AI insights, and visualize data instantly.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="rounded-3xl border bg-white p-6">
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-xl font-semibold mt-2">Active</p>
          <p className="text-xs text-gray-400 mt-1">
            System running normally
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6">
          <p className="text-sm text-gray-500">AI Engine</p>
          <p className="text-xl font-semibold mt-2">Mock Mode</p>
          <p className="text-xs text-gray-400 mt-1">
            Fast & free development mode
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6">
          <p className="text-sm text-gray-500">Datasets</p>
          <p className="text-xl font-semibold mt-2">Upload Ready</p>
          <p className="text-xs text-gray-400 mt-1">
            Start by uploading a CSV
          </p>
        </div>
      </div>

      {/* Main CTA */}
      <div className="rounded-3xl border bg-black text-white p-8">
        <h2 className="text-xl font-semibold">
          Start building insights from your data
        </h2>

        <p className="text-sm text-gray-300 mt-2">
          Upload a CSV file and let AI generate charts, summaries, and insights automatically.
        </p>

        <div className="mt-5 flex gap-3">
          <Link
            href="/dashboard/data-viz"
            className="rounded-xl bg-white text-black px-4 py-2 text-sm font-medium"
          >
            Upload Dataset
          </Link>

          <Link
            href="/dashboard/analytics"
            className="rounded-xl border border-white/30 px-4 py-2 text-sm"
          >
            View Analytics
          </Link>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="rounded-3xl border bg-white p-6">
          <h3 className="font-semibold">📊 Smart Visualization</h3>
          <p className="text-sm text-gray-500 mt-2">
            Auto-generated charts based on your dataset structure.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6">
          <h3 className="font-semibold">🤖 AI Insights</h3>
          <p className="text-sm text-gray-500 mt-2">
            Get summaries like trends, anomalies, and patterns.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6">
          <h3 className="font-semibold">⚡ Fast CSV Upload</h3>
          <p className="text-sm text-gray-500 mt-2">
            Drag & drop datasets and start instantly.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6">
          <h3 className="font-semibold">🔐 Personal Workspace</h3>
          <p className="text-sm text-gray-500 mt-2">
            All datasets and charts are tied to your account.
          </p>
        </div>
      </div>
    </div>
  );
}