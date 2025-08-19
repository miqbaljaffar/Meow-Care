/*
  Warnings:

  - You are about to drop the column `fotoKucing` on the `Testimoni` table. All the data in the column will be lost.
  - You are about to drop the column `namaKucing` on the `Testimoni` table. All the data in the column will be lost.
  - You are about to drop the column `namaPelanggan` on the `Testimoni` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[riwayatLayananId]` on the table `Testimoni` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `riwayatLayananId` to the `Testimoni` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Testimoni" DROP COLUMN "fotoKucing",
DROP COLUMN "namaKucing",
DROP COLUMN "namaPelanggan",
ADD COLUMN     "riwayatLayananId" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "Testimoni_riwayatLayananId_key" ON "public"."Testimoni"("riwayatLayananId");

-- AddForeignKey
ALTER TABLE "public"."Testimoni" ADD CONSTRAINT "Testimoni_riwayatLayananId_fkey" FOREIGN KEY ("riwayatLayananId") REFERENCES "public"."RiwayatLayanan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
