import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/app/lib/auth"; // You must implement this
import { Element } from "@prisma/client";

export async function PUT(req: NextRequest) {
  const user = await getUserFromRequest();

  if (user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { designId, name, elements } = await req.json();

  await prisma.element.deleteMany({
    where: { designId },
  });

  const design = await prisma.design.update({
    where: { id: designId },
    data: {
      name,
      elements: {
        create: elements.map((el: Element) => ({
          ...el,
        })),
      },
    },
  });

  return NextResponse.json({ success: true, design });
}
