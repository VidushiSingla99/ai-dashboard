import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { generateChartSuggestions } from "@/lib/chartSuggestions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const dataset = await prisma.dataset.findFirst({
      where: {
        userId: user.id,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    if (!dataset || !dataset.data || !dataset.headers) {
      return Response.json(
        { error: "No dataset found" },
        { status: 404 }
      );
    }

    const result = generateChartSuggestions(
      dataset.headers as string[],
      dataset.data as Record<string, string>[]
    );

    return Response.json(result);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}