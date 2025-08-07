import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId)
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  try {
    // 1. Owned designs
    const owned = await prisma.design.findMany({
      where: { userId },
      include: { elements: true },
    });

    // 2. Shared with me
    const sharedWithMe = await prisma.design.findMany({
      where: {
        sharedWith: { some: { id: userId } },
      },
      include: { elements: true },
    });

    // 3. Templates
    const templates = await prisma.design.findMany({
      where: {
        privacy: "template",
      },
      include: { elements: true },
    });

    console.log(templates);

    return NextResponse.json({ owned, sharedWithMe, templates });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
