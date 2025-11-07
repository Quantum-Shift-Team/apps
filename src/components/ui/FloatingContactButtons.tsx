"use client";

interface FloatingContactButtonsProps {
  kakaoChannelUrl?: string;
  telegramUrl?: string;
}

export function FloatingContactButtons({
  kakaoChannelUrl = "https://pf.kakao.com/_your_channel_id",
  telegramUrl = "https://t.me/your_telegram_channel",
}: FloatingContactButtonsProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {/* 카카오톡 채널 버튼 */}
      <a
        href={kakaoChannelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-300 transition-all hover:scale-110 active:scale-95"
        aria-label="카카오톡 채널"
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="#3C1E1E"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3Z" />
        </svg>
      </a>

      {/* 텔레그램 버튼 */}
      <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all hover:scale-110 active:scale-95"
        aria-label="텔레그램"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.87 8.8c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
        </svg>
      </a>
    </div>
  );
}
