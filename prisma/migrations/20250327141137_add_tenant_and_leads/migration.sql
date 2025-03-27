/*
  Warnings:

  - You are about to drop the `_CustomerToShop` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tenantId]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shopId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CustomerToShop" DROP CONSTRAINT "_CustomerToShop_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerToShop" DROP CONSTRAINT "_CustomerToShop_B_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "shopId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "role" TEXT;

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "tenantId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CustomerToShop";

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "interest" TEXT,
    "notes" TEXT,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_email_key" ON "Lead"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_tenantId_key" ON "Shop"("tenantId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
