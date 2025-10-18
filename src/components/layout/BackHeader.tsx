"use client";

interface BackHeaderProps {
  backLink: string;
  onClose?: () => void;
}

export function BackHeader({ backLink, onClose }: BackHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 z-[100]">
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
        <div className="flex items-center">
          <button
            onClick={onClose || (() => window.location.href = backLink)}
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
          </button>
        </div>
      </div>
    </header>
  );
}
