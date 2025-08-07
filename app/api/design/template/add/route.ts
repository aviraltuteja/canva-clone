// File: app/api/design/template/add/route.ts
import { getUserFromRequest } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest();

  if (user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { name, elements } = await req.json();

  const design = await prisma.design.create({
    data: {
      name,
      userId: user.id,
      privacy: "template",
      elements: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        create: elements.map((el: any) => ({
          ...el,
        })),
      },
    },
  });

  return NextResponse.json({ success: true, design });
}
