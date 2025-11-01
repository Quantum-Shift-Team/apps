"use client";

import { EXCHANGES } from "@/lib/exchanges";
import { notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import { FixedBottomButton } from "@/components/ui/FixedBottomButton";

interface ExchangeNewPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function ExchangeNewPage({ params }: ExchangeNewPageProps) {
  const { name } = use(params);
  const exchange = EXCHANGES.find(
    (ex) => ex.id.toLowerCase() === name.toLowerCase()
  );

  if (!exchange) {
    notFound();
  }

  return (
    <div className="flex flex-col h-screen px-6 py-6 pb-24">
      {/* 로고와 거래소 이름 */}
      <div className="flex flex-col items-center gap-4 pt-6">
        {exchange.logo.endsWith('.svg') || exchange.logo.endsWith('.png') ? (
          <Image 
            src={exchange.logo}
            alt={exchange.name}
            width={48}
            height={48}
            className={exchange.logoSize}
          />
        ) : (
          <span className={`font-tossface ${exchange.logoSize}`}>{exchange.logo}</span>
        )}
        <h1 className="text-2xl font-bold text-white">{exchange.name}</h1>
      </div>

      {/* 다음 버튼 */}
      <FixedBottomButton>
        다음
      </FixedBottomButton>
    </div>
  );
}
