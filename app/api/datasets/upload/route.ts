import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // Check auth
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();

    const { fileName, csvText } = body;

    if (!fileName || !csvText) {
      return Response.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    // Find user
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

    // Parse CSV
  const rows = csvText.trim().split("\n");

const headers = rows[0].split(",");

const parsedRows = rows.slice(1).map((row: string) => {
  const values = row.split(",");

  const rowObject: Record<string, string> = {};

  headers.forEach((header: string, index: number) => {
    rowObject[header.trim()] = values[index]?.trim();
  });

  return rowObject;
});

const rowCount = parsedRows.length;

    // Save dataset
    const dataset = await prisma.dataset.create({
      data: {
        fileName,
        headers,
        data: parsedRows,
        rowCount,
        userId: user.id,
      },
    });

    return Response.json(dataset);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}