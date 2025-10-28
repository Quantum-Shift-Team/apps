"use client";

import { BackHeader } from "@/components/layout/BackHeader";
import { LAYOUT_CONSTANTS } from "@/lib/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function AITradingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-900">
        <BackHeader backLink="/" />
        <main
          className="pb-6"
          style={{
            paddingTop: `${LAYOUT_CONSTANTS.BACK_HEADER_HEIGHT * 0.25}rem`,
          }}
        >
          {children}
        </main>
      </div>
    </QueryClientProvider>
  );
}
