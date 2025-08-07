-- AlterEnum
ALTER TYPE "public"."Privacy" ADD VALUE 'private_template';

-- AlterTable
ALTER TABLE "public"."Element" ADD COLUMN     "fontWeight" TEXT;
