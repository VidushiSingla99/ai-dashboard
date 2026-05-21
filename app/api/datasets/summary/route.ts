import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function GET() {
  try {
     const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const dataset = await prisma.dataset.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    if (!dataset?.data || !dataset?.headers) {
      return Response.json({ error: "No dataset found" }, { status: 404 });
    }

    const data = dataset.data as Record<string, string>[];
    const headers = dataset.headers as string[];

    // -----------------------------
    // 🔥 LOCAL "AI" ANALYSIS ENGINE
    // -----------------------------

    const rowCount = data.length;

    const numericStats: Record<string, number[]> = {};
    const categoryCounts: Record<string, Record<string, number>> = {};

    headers.forEach((h) => {
      numericStats[h] = [];
      categoryCounts[h] = {};
    });

    // analyze data
    for (const row of data) {
      for (const key of headers) {
        const value = row[key];

        if (!value) continue;

        const num = Number(value);

        if (!isNaN(num)) {
          numericStats[key].push(num);
        } else {
          categoryCounts[key][value] =
            (categoryCounts[key][value] || 0) + 1;
        }
      }
    }

    // compute insights
    const insights: string[] = [];

    insights.push(`• Dataset contains ${rowCount} rows`);

    // numeric insights
    for (const key of headers) {
      const values = numericStats[key];

      if (values.length > 2) {
        const avg =
          values.reduce((a, b) => a + b, 0) / values.length;

        insights.push(
          `• Average ${key} is ${avg.toFixed(2)}`
        );
      }
    }

    // categorical insights
    for (const key of headers) {
      const counts = categoryCounts[key];

      const entries = Object.entries(counts);

      if (entries.length > 0 && entries.length <= 10) {
        const top = entries.sort((a, b) => b[1] - a[1])[0];

        if (top) {
          insights.push(
            `• Most common ${key} is ${top[0]}`
          );
        }
      }
    }

    // department-style insight (heuristic)
    if (categoryCounts["department"]) {
      const deptStats = categoryCounts["department"];

      const topDept = Object.entries(deptStats).sort(
        (a, b) => b[1] - a[1]
      )[0];

      if (topDept) {
        insights.push(
          `• ${topDept[0]} appears most frequently`
        );
      }
    }

    const summary = insights.join("\n");

    return Response.json({ summary });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}