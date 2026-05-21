export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">
          Reports
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          AI-generated summaries and dataset reports.
        </p>
      </div>

      <div className="rounded-3xl border bg-white p-6">
        Latest Report (Coming from AI summary)
      </div>

      <div className="rounded-3xl border bg-white p-6">
        Saved Reports
      </div>
    </div>
  );
}