import { handlers } from "@/auth"; // Mengambil handlers dari file src/auth.ts yang baru dibuat

export const runtime = 'nodejs';

// Hanya eksport GET dan POST agar Next.js tidak error saat build
export const { GET, POST } = handlers;