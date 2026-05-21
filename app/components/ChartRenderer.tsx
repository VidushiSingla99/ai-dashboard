"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  title: string;
  data: any[];
  xAxis: string;
  yAxis: string;
};

export default function ChartRenderer({
  title,
  data,
  xAxis,
  yAxis,
}: Props) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6">

      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">
          {title}
        </h2>
      </div>

      <div className="h-80 w-full">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey={xAxis} />

            <YAxis />

            <Tooltip />

            <Bar dataKey={yAxis} radius={[8, 8, 0, 0]} />

          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}