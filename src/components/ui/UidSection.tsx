"use client";

import { useState } from "react";

interface UidSectionProps {
  initialUid: string | null;
}

export function UidSection({ initialUid }: UidSectionProps) {
  const [uid, setUid] = useState(initialUid || "");
  const [isEditing, setIsEditing] = useState(!initialUid);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/user/update-uid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "UID 업데이트에 실패했습니다.");
      }

      setSuccess(true);
      setIsEditing(false);
      // 페이지 새로고침하여 최신 데이터 표시
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setUid(initialUid || "");
    setIsEditing(false);
    setError(null);
    setSuccess(false);
  };

  return (
    <div>
      <label className="text-sm text-gray-400 mb-2 block">UID</label>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              placeholder="UID를 입력하세요"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              disabled={isSubmitting}
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          {success && (
            <div className="text-green-500 text-sm">
              UID가 성공적으로 등록되었습니다!
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "등록 중..." : "등록하기"}
            </button>
            {initialUid && (
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                취소
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-white font-mono">{uid || "등록되지 않음"}</div>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {initialUid ? "수정" : "등록"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
