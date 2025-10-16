"use client";

import { Header } from "./Header";
import { MobileNavigation } from "./MobileNavigation";

interface MainLayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
  padding?: string;
  className?: string;
  fixedHeight?: boolean;
}

export function MainLayout({
  children,
  maxWidth = "max-w-7xl",
  padding = "px-6",
  className = "",
  fixedHeight = false,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="bg-gray-900 pb-16 md:pb-0 pt-20 md:pt-20">
        <div
          className={`${maxWidth} mx-auto ${
            fixedHeight
              ? "h-[calc(100vh-5rem-4rem)] md:h-[calc(100vh-6rem)] overflow-hidden"
              : "min-h-screen"
          } ${padding} ${className}`}
        >
          {children}
        </div>
      </main>
      <MobileNavigation />
    </div>
  );
}
