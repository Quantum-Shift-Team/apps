"use client";

import { Header } from "./Header";
import { MobileNavigation } from "./MobileNavigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="bg-gray-900">
        {children}
      </main>
      <MobileNavigation />
    </div>
  );
}
