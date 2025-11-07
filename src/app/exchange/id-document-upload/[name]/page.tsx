"use client";

import { EXCHANGES } from "@/lib/exchanges";
import { notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import { FixedBottomButton } from "@/components/ui/FixedBottomButton";

interface ExchangeIdDocumentUploadPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function ExchangeIdDocumentUploadPage({
  params,
}: ExchangeIdDocumentUploadPageProps) {
  const { name } = use(params);
  const exchange = EXCHANGES.find(
    (ex) => ex.id.toLowerCase() === name.toLowerCase()
  );

  if (!exchange) {
    notFound();
  }

  // idDocumentUploadGuideImage가 있으면 사용하고, 없으면 signupGuideImage 사용
  const idDocumentUploadGuideImage: string | null =
    "idDocumentUploadGuideImage" in exchange
      ? (exchange.idDocumentUploadGuideImage as string)
      : "signupGuideImage" in exchange
      ? (exchange.signupGuideImage as string)
      : null;

  if (!idDocumentUploadGuideImage) {
    return null;
  }

  return (
    <>
      {/* 상단 텍스트 - 왼쪽 정렬 */}
      <div className="flex flex-col items-start gap-2 p-6">
        <p className="text-sm text-gray-400">해외 거래소 가입하기</p>
        <h1 className="text-2xl font-bold text-white">
          사진 업로드를 진행해주세요.
        </h1>
        <p className="text-sm text-blue-500">
          사진 촬영을 선택하셨다면 다음 단계로 넘어가주세요!
        </p>
      </div>
      <div className="w-70 mx-auto">
        <Image
          src={idDocumentUploadGuideImage}
          alt={`${exchange.name} 신분증 업로드 가이드`}
          width={800}
          height={1200}
          className="w-full max-w-2xl h-auto object-contain rounded-lg"
        />

        <FixedBottomButton
          href={`/exchange/id-document-capture/${name}`}
          bgOpacity={90}
        >
          다음
        </FixedBottomButton>
      </div>
    </>
  );
}
