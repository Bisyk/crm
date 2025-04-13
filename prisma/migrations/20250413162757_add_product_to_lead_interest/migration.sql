-- AddForeignKey
ALTER TABLE "LeadInterest" ADD CONSTRAINT "LeadInterest_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
