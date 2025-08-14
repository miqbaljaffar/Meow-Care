-- CreateTable
CREATE TABLE "public"."Antrian" (
    "id" SERIAL NOT NULL,
    "namaPemilik" TEXT NOT NULL,
    "namaKucing" TEXT NOT NULL,
    "nomorTelepon" TEXT NOT NULL,
    "jenisLayanan" TEXT NOT NULL,
    "nomorAntrian" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Menunggu',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Antrian_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Antrian_nomorAntrian_key" ON "public"."Antrian"("nomorAntrian");
