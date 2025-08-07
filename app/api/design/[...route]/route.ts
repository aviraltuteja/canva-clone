// File: app/api/design/[...route]/route.ts (or adjust for your route structure)
import { CanvasElement } from "@/app/lib/types/design";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// POST /api/design/create
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { pathname } = new URL(req.url);

  if (pathname.endsWith("/design/create")) {
    const { userId, name, privacy } = await req.json();

    const design = await prisma.design.create({
      data: {
        name,
        userId,
        privacy,
      },
    });

    return NextResponse.json(design);
  }

  if (pathname.endsWith("/design/from-template")) {
    const { userId, designId } = await req.json();

    const template = await prisma.design.findUnique({
      where: { id: designId },
      include: { elements: true },
    });

    if (!template || template.privacy !== "template") {
      return NextResponse.json({ error: "Invalid template" }, { status: 400 });
    }

    const newDesign = await prisma.design.create({
      data: {
        name: `${template.name} Copy`,
        userId,
        privacy: "private",
        elements: {
          create: template.elements.map(({ ...rest }) => rest),
        },
      },
    });

    return NextResponse.json(newDesign);
  }

  if (pathname.endsWith("/design/update")) {
    const {
      designId,
      canvas,
    }: {
      designId: string;
      canvas: {
        width: number;
        height: number;
        backgroundColor: string;
        elements: CanvasElement[];
      };
    } = await req.json();
    await prisma.element.deleteMany({ where: { designId } });

    await prisma.element.createMany({
      data: canvas.elements.map((el) => ({ ...el, designId })),
    });
    await prisma.design.update({
      where: { id: designId },
      data: {
        width: canvas.width,
        height: canvas.height,
        backgroundColor: canvas.backgroundColor,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  }
  if (pathname.endsWith("/design/share")) {
    const {
      designId,
      emailToShareWith,
    }: { designId: string; emailToShareWith: string } = await req.json();

    const userToShare = await prisma.user.findUnique({
      where: { email: emailToShareWith },
    });

    if (!userToShare) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.design.update({
      where: { id: designId },
      data: {
        sharedWith: {
          connect: {
            id: userToShare.id,
          },
        },
      },
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid route" }, { status: 404 });
}
