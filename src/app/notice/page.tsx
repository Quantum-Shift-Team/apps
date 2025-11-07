"use client";

import { useState } from "react";
import Link from "next/link";
import { BackHeader } from "@/components/layout/BackHeader";
import { Category } from "./types";
import { CATEGORIES, TOP_QUESTIONS } from "./data";

export default function NoticePage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <BackHeader backLink="/" title="공지사항" showCustomerService={true} />

      <div className="pt-20 px-4 pb-8">
        {/* 검색창 */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 text-sm"
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-700 mb-6"></div>

        {/* 카테고리 섹션 */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-400 mb-3">카테고리</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(isSelected ? null : category);
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* 질문 Top 섹션 */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 mb-4">질문 Top</h2>
          <div className="space-y-3">
            {TOP_QUESTIONS.filter((question) => {
              // 카테고리 필터링
              const matchesCategory =
                !selectedCategory ||
                question.categories.includes(selectedCategory);

              // 검색 키워드 필터링 (카테고리 또는 제목에 포함)
              const normalizedKeyword = searchKeyword.trim().toLowerCase();
              const matchesSearch =
                !normalizedKeyword ||
                question.categories.some((cat) =>
                  cat.toLowerCase().includes(normalizedKeyword)
                ) ||
                question.title.toLowerCase().includes(normalizedKeyword);

              return matchesCategory && matchesSearch;
            }).map((question) => (
              <Link
                key={question.id}
                href={`/notice/${question.id}`}
                className="block bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-white font-medium flex-1">
                    {question.title}
                  </h3>
                  <svg
                    className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
