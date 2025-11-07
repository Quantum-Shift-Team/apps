"use client";

import { Header } from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-gray-900">
      <Header />
      <main className="bg-gray-900">
        {children}
      </main>
    </div>
  );
}
