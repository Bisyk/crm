/*
  Warnings:

  - You are about to drop the column `tenantId` on the `Shop` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Shop_tenantId_key";

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "tenantId";
