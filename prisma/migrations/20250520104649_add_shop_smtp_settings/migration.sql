-- CreateTable
CREATE TABLE "ShopSmtpSettings" (
    "id" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "smtpHost" TEXT NOT NULL,
    "smtpPort" INTEGER NOT NULL,
    "smtpUser" TEXT NOT NULL,
    "smtpPassword" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "ShopSmtpSettings_pkey" PRIMARY KEY ("id")
);
