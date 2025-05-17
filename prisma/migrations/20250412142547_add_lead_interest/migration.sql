/*
  Warnings:

  - Added the required column `employeeId` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "employeeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "LeadInterest" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "LeadInterest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeadInterest" ADD CONSTRAINT "LeadInterest_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
