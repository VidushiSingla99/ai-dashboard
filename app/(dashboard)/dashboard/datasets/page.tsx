export default function DatasetsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">
          Datasets
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage uploaded CSV files and data sources.
        </p>
      </div>

      <div className="rounded-3xl border bg-white p-6">
        Upload new dataset (reuse FileUpload component)
      </div>

      <div className="rounded-3xl border bg-white p-6">
        All uploaded datasets list
      </div>
    </div>
  );
}