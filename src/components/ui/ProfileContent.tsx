"use client";

import Image from "next/image";
import { EditableListItem } from "./EditableListItem";

interface ProfileContentProps {
  user: {
    id: string;
    nickname: string | null;
    email: string | null;
    kakaoId: string;
    uid: string | null;
    phoneNumber: string | null;
    accountInfo: string | null;
    profileImage: string | null;
    createdAt: Date;
  };
}

export function ProfileContent({ user }: ProfileContentProps) {
  const handleNicknameUpdate = async (newNickname: string) => {
    const response = await fetch("/api/user/update-nickname", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname: newNickname }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "닉네임 업데이트에 실패했습니다.");
    }

    // 페이지 새로고침하여 최신 데이터 표시
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleUidUpdate = async (newUid: string) => {
    const response = await fetch("/api/user/update-uid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: newUid }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "UID 업데이트에 실패했습니다.");
    }

    // 페이지 새로고침하여 최신 데이터 표시
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handlePhoneNumberUpdate = async (newPhoneNumber: string) => {
    const response = await fetch("/api/user/update-phone-number", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: newPhoneNumber }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "전화번호 업데이트에 실패했습니다.");
    }

    // 페이지 새로고침하여 최신 데이터 표시
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleAccountInfoUpdate = async (newAccountInfo: string) => {
    const response = await fetch("/api/user/update-account-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountInfo: newAccountInfo }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "계좌정보 업데이트에 실패했습니다.");
    }

    // 페이지 새로고침하여 최신 데이터 표시
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      {/* 프로필 이미지 */}
      {user.profileImage && (
        <div className="flex justify-center py-6">
          <Image
            src={user.profileImage}
            alt="프로필"
            width={128}
            height={128}
            className="w-32 h-32 rounded-full object-cover"
            unoptimized
          />
        </div>
      )}

      <div className="space-y-1">
        {/* 닉네임 */}
        <EditableListItem
          label="닉네임"
          value={user.nickname || ""}
          onSave={handleNicknameUpdate}
          placeholder="설정되지 않음"
        />
        {/* UID */}
        <EditableListItem
          label="UID"
          value={user.uid || ""}
          onSave={handleUidUpdate}
          placeholder="등록되지 않음"
        />

        {/* 전화번호 */}
        <EditableListItem
          label="전화번호"
          value={user.phoneNumber || ""}
          onSave={handlePhoneNumberUpdate}
          placeholder="등록되지 않음"
        />

        {/* 계좌정보 */}
        <EditableListItem
          label="계좌정보"
          value={user.accountInfo || ""}
          onSave={handleAccountInfoUpdate}
          placeholder="등록되지 않음"
        />

        {/* 가입일 */}
        <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-800 cursor-pointer transition-colors">
          <span className="text-gray-400 text-sm">가입일</span>
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm">
              {user.createdAt.toLocaleDateString("ko-KR")}
            </span>
            <svg
              className="w-4 h-4 text-gray-400"
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
        </div>
      </div>
    </>
  );
}
