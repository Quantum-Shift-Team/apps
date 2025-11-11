"use client";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Header />
      <Sidebar />
      <main className="bg-gray-900 w-full md:ml-64 md:w-[calc(100%-16rem)]">
        {children}
      </main>
    </div>
  );
}
