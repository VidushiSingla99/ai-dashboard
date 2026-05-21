type Row = Record<string, string>;

export function generateChartSuggestions(
  headers: string[],
  data: Row[]
) {
  const numericColumns: string[] = [];

  const categoricalColumns: string[] = [];

  // Detect column types
  headers.forEach((header) => {
    const values = data
      .map((row) => row[header])
      .filter(Boolean);

    const numericValues = values.filter(
      (value) => !isNaN(Number(value))
    );

    const numericRatio =
      numericValues.length / values.length;

    if (numericRatio > 0.8) {
      numericColumns.push(header);

    } else {
      // Detect unique values
      const uniqueValues = new Set(values);

      // Ignore columns with too many uniques
      // like names, IDs, emails
      if (uniqueValues.size <= 8) {
        categoricalColumns.push(header);
      }
    }
  });

  const suggestions = [];

  // Generate useful charts
  for (const category of categoricalColumns) {
    for (const numeric of numericColumns) {

      // Skip weird combinations
      if (category === numeric) continue;

      suggestions.push({
        type: "bar",
        title: `Average ${numeric} by ${category}`,
        xAxis: category,
        yAxis: numeric,
      });
    }
  }

  return {
    numericColumns,
    categoricalColumns,
    suggestions,
  };
}