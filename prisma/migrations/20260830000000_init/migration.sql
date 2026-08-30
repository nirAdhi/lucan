-- CreateTable
CREATE TABLE "dentists" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "qualifications" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "bio" TEXT[],
    "specialities" TEXT[],
    "treatments" TEXT[],
    "photoUrl" TEXT,
    "registration" TEXT,
    "languages" TEXT[],
    "seoTitle" TEXT NOT NULL,
    "seoDescription" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dentists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_items" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "note" TEXT,
    "groupSlug" TEXT NOT NULL,
    "groupTitle" TEXT NOT NULL,
    "groupOrder" INTEGER NOT NULL DEFAULT 0,
    "itemOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "price_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_studies" (
    "id" TEXT NOT NULL,
    "treatmentSlug" TEXT NOT NULL,
    "treatmentLabel" TEXT NOT NULL,
    "beforePhotoUrl" TEXT NOT NULL,
    "afterPhotoUrl" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "consentConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_studies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dentists_slug_key" ON "dentists"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "price_items_slug_key" ON "price_items"("slug");

