'use client'

import { Header } from './Header'

interface MainLayoutProps {
  children: React.ReactNode
  maxWidth?: string
  padding?: string
  className?: string
}

export function MainLayout({ 
  children, 
  maxWidth = "max-w-7xl", 
  padding = "px-6",
  className = ""
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#191919]">
      <Header />
      <main className="bg-[#191919]">
        <div className={`${maxWidth} mx-auto min-h-screen ${padding} ${className}`}>
          {children}
        </div>
      </main>
    </div>
  )
}
