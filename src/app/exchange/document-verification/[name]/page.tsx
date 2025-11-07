"use client";

import { EXCHANGES } from "@/lib/exchanges";
import { notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import { FixedBottomButton } from "@/components/ui/FixedBottomButton";

interface ExchangeDocumentVerificationPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function ExchangeDocumentVerificationPage({
  params,
}: ExchangeDocumentVerificationPageProps) {
  const { name } = use(params);
  const exchange = EXCHANGES.find(
    (ex) => ex.id.toLowerCase() === name.toLowerCase()
  );

  if (!exchange) {
    notFound();
  }

  // documentVerificationGuideImage가 있으면 사용하고, 없으면 signupGuideImage 사용
  const documentVerificationGuideImage: string | null =
    "documentVerificationGuideImage" in exchange
      ? (exchange.documentVerificationGuideImage as string)
      : "signupGuideImage" in exchange
      ? (exchange.signupGuideImage as string)
      : null;

  if (!documentVerificationGuideImage) {
    return null;
  }

  return (
    <>
      {/* 상단 텍스트 - 왼쪽 정렬 */}
      <div className="flex flex-col items-start gap-2 p-6">
        <p className="text-sm text-gray-400">해외 거래소 가입하기</p>
        <h1 className="text-2xl font-bold text-white">
          인증 방법을 선택하세요.
        </h1>
        <p className="text-sm text-blue-500">
          사진을 업로드 하거나 촬영하면 됩니다!
        </p>
      </div>
      <div className="w-70 mx-auto">
        <Image
          src={documentVerificationGuideImage}
          alt={`${exchange.name} 문서 인증 가이드`}
          width={800}
          height={1200}
          className="w-full max-w-2xl h-auto object-contain rounded-lg"
        />

        <FixedBottomButton
          href={`/exchange/id-document-upload/${name}`}
          bgOpacity={90}
        >
          다음
        </FixedBottomButton>
      </div>
    </>
  );
}
