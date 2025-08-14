-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Kucing" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "spesies" TEXT NOT NULL,
    "umur" INTEGER NOT NULL,
    "pemilikId" INTEGER NOT NULL,

    CONSTRAINT "Kucing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RiwayatLayanan" (
    "id" SERIAL NOT NULL,
    "kucingId" INTEGER NOT NULL,
    "jenisLayanan" TEXT NOT NULL,
    "catatan" TEXT,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RiwayatLayanan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Kucing" ADD CONSTRAINT "Kucing_pemilikId_fkey" FOREIGN KEY ("pemilikId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RiwayatLayanan" ADD CONSTRAINT "RiwayatLayanan_kucingId_fkey" FOREIGN KEY ("kucingId") REFERENCES "public"."Kucing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
