"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// 상대 시간 계산 함수
const getRelativeTime = (timestamp: string) => {
  const now = new Date().getTime();
  const time = new Date(timestamp).getTime();
  const diffInSeconds = Math.floor((now - time) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 전`;
  }
};

interface WhaleTransaction {
  id: number;
  type: "deposit" | "withdraw";
  crypto: string;
  amountInDollars: number;
  exchange: string;
  exchangeId: string;
  logo: string;
  logoSize: string;
  timestamp: string;
}

export function WhaleTransactionSection() {
  const [transactions, setTransactions] = useState<WhaleTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 서버에서 데이터 가져오기
  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/whale-transactions");
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const result = await response.json();
      setTransactions(result.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching whale transactions:", error);
      setIsLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchTransactions();
  }, []);

  // 1분~3분 사이로 업데이트 (랜덤)
  useEffect(() => {
    const scheduleNextUpdate = () => {
      // 60초 ~ 180초 사이 랜덤
      const randomDelay = Math.floor(Math.random() * 120000) + 60000;
      return setTimeout(() => {
        fetchTransactions();
        timeoutId = scheduleNextUpdate();
      }, randomDelay);
    };

    let timeoutId = scheduleNextUpdate();
    return () => clearTimeout(timeoutId);
  }, []);

  // 실시간으로 상대 시간 업데이트
  const [, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-6 py-6 text-white">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 섹션 */}
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-3xl font-bold mb-2">
            고래 입출금 내역
          </h2>
          <p className="text-gray-400 text-xs md:text-sm">
            대형 거래소의 실시간 고액 입출금 현황
          </p>
        </div>

        {/* 고래 거래 리스트 */}
        <div className="px-2">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-base font-semibold">실시간 거래 내역</h4>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400">LIVE</span>
            </div>
          </div>
          <div className="space-y-2">
            {isLoading ? (
              <div className="text-center py-4 text-gray-400 text-sm">
                로딩 중...
              </div>
            ) : (
              transactions.slice(0, 5).map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                    transaction.type === "deposit"
                      ? "bg-green-500/10 hover:bg-green-500/15"
                      : "bg-red-500/10 hover:bg-red-500/15"
                  }`}
                  style={{
                    animation: index === 0 ? "slideIn 0.5s ease-out" : "none",
                  }}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    {/* 거래소 아이콘 */}
                    <div className="w-8 h-8 overflow-hidden rounded-lg flex items-center justify-center flex-shrink-0">
                      {transaction.logo.endsWith(".svg") ||
                      transaction.logo.endsWith(".png") ? (
                        <Image
                          src={transaction.logo}
                          alt={transaction.exchange}
                          width={32}
                          height={32}
                          className={transaction.logoSize}
                        />
                      ) : (
                        <span
                          className={`font-tossface ${transaction.logoSize}`}
                        >
                          {transaction.logo}
                        </span>
                      )}
                    </div>

                    {/* 거래 정보 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-medium text-xs">
                          {transaction.type === "deposit" ? "입금" : "출금"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {transaction.exchange}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {getRelativeTime(transaction.timestamp)}
                      </div>
                    </div>
                  </div>

                  {/* 금액 정보 */}
                  <div className="text-right">
                    <div
                      className={`text-sm font-bold ${
                        transaction.type === "deposit"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction.type === "deposit" ? "+" : "-"}$
                      {transaction.amountInDollars.toLocaleString("ko-KR")}{" "}
                      {transaction.crypto}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
