import FileUpload from "@/app/components/FileUpload";
import DatasetHistory from "@/app/components/DatasetHistory";
import DatasetPreview from "@/app/components/DatasetPreview";
import ChartSuggestions from "@/app/components/ChartSuggestions";
import AutoCharts from "@/app/components/AutoCharts";
import AISummary from "@/app/components/AISummary";

export default function DataVizPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Data Visualization
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Upload CSV files and generate visual insights.
        </p>
      </div>

      <FileUpload/>
      <DatasetHistory />
     <DatasetPreview />
     <ChartSuggestions />
     <AutoCharts />
     <AISummary />
    </div>
  );
}