"use client";

import Link from "next/link";

interface BackHeaderProps {
  backLink: string;
}

export function BackHeader({ backLink }: BackHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center">
          <Link
            href={backLink}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
