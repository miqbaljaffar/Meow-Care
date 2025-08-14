-- CreateTable
CREATE TABLE "public"."Artikel" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "kutipan" TEXT NOT NULL,
    "gambar" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draf',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "penulisId" INTEGER NOT NULL,

    CONSTRAINT "Artikel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artikel_slug_key" ON "public"."Artikel"("slug");

-- AddForeignKey
ALTER TABLE "public"."Artikel" ADD CONSTRAINT "Artikel_penulisId_fkey" FOREIGN KEY ("penulisId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
