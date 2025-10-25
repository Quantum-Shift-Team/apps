"use client";

import { useState, useEffect } from "react";
import { EXCHANGES } from "@/lib/exchanges";

// 더미 유저 데이터
const generateMockUsers = () => {
  const names = ["조남일", "최민준", "최건태", "이동연", "박도균"];
  return names.map((name, index) => ({
    id: index + 1,
    name,
    amount: Math.floor(Math.random() * 500000) + 50000,
    exchange: EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)].name,
    timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
  }));
};

export function RealtimePaybackSection() {
  const [liveUsers, setLiveUsers] = useState<
    Array<{
      id: number;
      name: string;
      amount: number;
      exchange: string;
      timestamp: string;
    }>
  >([]);

  // 초기 데이터 로드 (클라이언트에서만)
  useEffect(() => {
    setLiveUsers(generateMockUsers());
  }, []);

  // 실시간 업데이트 효과 (5~15초 랜덤)
  useEffect(() => {
    const scheduleNextUpdate = () => {
      const randomDelay = Math.floor(Math.random() * 10000) + 5000; // 5000~15000ms
      return setTimeout(() => {
        setLiveUsers((prev) => {
          const names = [
            "조남일",
            "최민준",
            "최건태",
            "이동연",
            "박도균",
            "윤태섭",
            "조원규",
            "박준성",
            "허정민",
            "송하은",
          ];
          const newUser = {
            id: Date.now(),
            name: names[Math.floor(Math.random() * names.length)],
            amount: Math.floor(Math.random() * 500000) + 50000,
            exchange:
              EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)].name,
            timestamp: new Date().toISOString(),
          };
          return [newUser, ...prev.slice(0, 4)];
        });
        timeoutId = scheduleNextUpdate();
      }, randomDelay);
    };

    let timeoutId = scheduleNextUpdate();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="px-6 py-6 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        {/* 실시간 페이백 리스트 뷰 */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-2">
            실시간 페이백 환급 현황
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            지금 이 순간에도 페이백을 받고 있는 유저들
          </p>
        </div>

        {/* 실시간 유저 리스트 */}
        <div className="px-2">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold">실시간 환급 내역</h4>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400">LIVE</span>
            </div>
          </div>
          <div className="space-y-3">
            {liveUsers.slice(0, 5).map((user, index) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all"
                style={{
                  animation: index === 0 ? "slideIn 0.5s ease-out" : "none",
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.exchange}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-400">
                    +{user.amount.toLocaleString()}원
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(user.timestamp).toLocaleTimeString("ko-KR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
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
