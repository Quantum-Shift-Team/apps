import { PrismaClient } from "@prisma/client";

// Prisma Client를 전역 변수로 생성하여 개발 환경에서 hot reload 시 중복 생성 방지
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// 모든 환경에서 전역 변수에 저장하여 중복 생성 방지 (Turbopack 호환성)
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = db;
}

