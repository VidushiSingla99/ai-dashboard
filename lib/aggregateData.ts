type Row = Record<string, string>;

export function aggregateAverage(
  data: Row[],
  categoryKey: string,
  numericKey: string
) {
  const grouped: Record<
    string,
    { total: number; count: number }
  > = {};

  data.forEach((row) => {
    const category = row[categoryKey];

    const numericValue = Number(row[numericKey]);

    if (!category || isNaN(numericValue)) {
      return;
    }

    if (!grouped[category]) {
      grouped[category] = {
        total: 0,
        count: 0,
      };
    }

    grouped[category].total += numericValue;

    grouped[category].count += 1;
  });

  return Object.entries(grouped).map(
    ([category, values]) => ({
      [categoryKey]: category,

      [numericKey]:
        Math.round(
          values.total / values.count
        ),
    })
  );
}