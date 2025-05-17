-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deliveryStatus" TEXT NOT NULL DEFAULT 'processing',
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'pending';
