/*
  Warnings:

  - A unique constraint covering the columns `[shopId]` on the table `ShopSmtpSettings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ShopSmtpSettings_shopId_key" ON "ShopSmtpSettings"("shopId");
