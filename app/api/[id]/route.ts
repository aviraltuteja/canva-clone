import { getUserFromRequest } from "@/app/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const user: {
    id: string;
    name: string;
    email: string;
    role: "client" | "admin";
  } | null = await getUserFromRequest();

  try {
    const design = await prisma.design.findUnique({
      where: { id },
      include: { elements: true },
    });

    if (design?.userId != user?.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    if (!design) {
      return NextResponse.json({ error: "Design not found" }, { status: 404 });
    }

    return NextResponse.json(design);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" + error },
      { status: 500 }
    );
  }
}
