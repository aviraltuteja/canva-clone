-- CreateEnum
CREATE TYPE "public"."UserRoles" AS ENUM ('client', 'admin');

-- CreateTable
CREATE TABLE "public"."Design" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Design_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Element" (
    "id" TEXT NOT NULL,
    "designId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "text" TEXT,
    "src" TEXT,
    "left" DOUBLE PRECISION NOT NULL,
    "top" DOUBLE PRECISION NOT NULL,
    "fontSize" INTEGER,
    "fontFamily" TEXT,
    "scaleX" DOUBLE PRECISION,
    "scaleY" DOUBLE PRECISION,

    CONSTRAINT "Element_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "public"."UserRoles" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Element" ADD CONSTRAINT "Element_designId_fkey" FOREIGN KEY ("designId") REFERENCES "public"."Design"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
