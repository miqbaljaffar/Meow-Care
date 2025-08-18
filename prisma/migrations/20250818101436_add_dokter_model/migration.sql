-- CreateTable
CREATE TABLE "public"."Dokter" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "spesialisasi" TEXT NOT NULL,
    "foto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dokter_pkey" PRIMARY KEY ("id")
);
