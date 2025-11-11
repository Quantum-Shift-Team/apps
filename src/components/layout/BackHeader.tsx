"use client";

import { useState } from "react";
import { CustomerServiceModal } from "@/components/ui/CustomerServiceModal";

interface BackHeaderProps {
  backLink: string;
  onClose?: () => void;
  title?: string;
  showCustomerService?: boolean;
}

export function BackHeader({
  backLink,
  onClose,
  title,
  showCustomerService = false,
}: BackHeaderProps) {
  const [isCustomerServiceOpen, setIsCustomerServiceOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-gray-900 z-[100]">
        <div className="max-w-3xl mx-auto px-4 md:px-6 pt-4 pb-2">
          <div className="flex items-center justify-between relative">
            <button
              onClick={onClose || (() => (window.location.href = backLink))}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity relative z-10"
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
            {title && (
              <div className="absolute left-0 right-0 flex items-center justify-center pointer-events-none">
                <h1 className="text-lg font-semibold text-white">{title}</h1>
              </div>
            )}
            {showCustomerService && (
              <button
                onClick={() => setIsCustomerServiceOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors relative z-10"
                aria-label="고객센터"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="text-sm text-white font-medium">고객센터</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 고객센터 모달 */}
      {showCustomerService && (
        <CustomerServiceModal
          isOpen={isCustomerServiceOpen}
          onClose={() => setIsCustomerServiceOpen(false)}
        />
      )}
    </>
  );
}
