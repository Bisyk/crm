/*
  Warnings:

  - Added the required column `smtpFrom` to the `ShopSmtpSettings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShopSmtpSettings" ADD COLUMN     "smtpFrom" TEXT NOT NULL;
