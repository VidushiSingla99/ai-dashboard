import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
   const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const updatedUser = await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      name: body.name,
      jobTitle: body.jobTitle,
      company: body.company,
      bio: body.bio,
    },
  });

  return Response.json(updatedUser);
}