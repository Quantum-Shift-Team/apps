"use client";

import { use } from "react";
import Link from "next/link";
import { BackHeader } from "@/components/layout/BackHeader";
import { QUESTIONS } from "../data";

interface NoticeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { id } = use(params);
  const questionId = parseInt(id, 10);
  const question = QUESTIONS[questionId];

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-900">
        <BackHeader
          backLink="/notice"
          title="공지사항"
          showCustomerService={true}
        />
        <div className="pt-20 px-4 pb-8">
          <div className="text-center text-white">
            <p className="text-lg">질문을 찾을 수 없습니다.</p>
            <Link
              href="/notice"
              className="mt-4 inline-block text-blue-500 hover:text-blue-400"
            >
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const kakaoChannelUrl = "https://pf.kakao.com/_your_channel_id";
  const telegramUrl = "https://t.me/your_telegram_channel";

  return (
    <div className="min-h-screen bg-gray-900">
      <BackHeader
        backLink="/notice"
        title="공지사항"
        showCustomerService={true}
      />

      <div className="pt-20 px-8 pb-8">
        {/* 질문 제목 */}
        <h1 className="text-xl font-bold text-white mb-2">{question.title}</h1>

        {/* 카테고리 리스트 */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {question.categories.map((category) => (
            <span
              key={category}
              className="px-2 py-1 bg-gray-700 text-white text-[8px] rounded"
            >
              {category}
            </span>
          ))}
        </div>

        {/* 응답 내용 */}
        <div className="mb-8">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-line leading-relaxed text-smflex flex-col gap-3">
              {question.answer}
            </p>
          </div>
        </div>

        {/* 고객센터 섹션 */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-xl font-bold text-white mb-2">
            고객센터는 24시간 상담이 가능해요
          </p>
          <div className="flex gap-2">
            <a
              href={kakaoChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-2 py-1 bg-yellow-500/70 hover:bg-yellow-500/80 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="#3C1E1E"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3Z" />
              </svg>
              <span className="text-gray-900 font-semibold text-xs">
                카톡 상담
              </span>
            </a>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-2 py-1 bg-blue-600/70 hover:bg-blue-600/80 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.87 8.8c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
              </svg>
              <span className="text-gray-300 font-semibold text-xs">
                텔레그램 상담
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
