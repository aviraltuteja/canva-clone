/*
  Warnings:

  - Added the required column `userId` to the `Design` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Privacy" AS ENUM ('private', 'shared', 'template');

-- AlterTable
ALTER TABLE "public"."Design" ADD COLUMN     "privacy" "public"."Privacy" NOT NULL DEFAULT 'private',
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."_SharedDesigns" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SharedDesigns_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SharedDesigns_B_index" ON "public"."_SharedDesigns"("B");

-- AddForeignKey
ALTER TABLE "public"."Design" ADD CONSTRAINT "Design_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SharedDesigns" ADD CONSTRAINT "_SharedDesigns_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Design"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SharedDesigns" ADD CONSTRAINT "_SharedDesigns_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
