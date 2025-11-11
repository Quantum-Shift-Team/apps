"use client";

interface CustomerServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  kakaoChannelUrl?: string;
  telegramUrl?: string;
}

export function CustomerServiceModal({
  isOpen,
  onClose,
  kakaoChannelUrl = "https://pf.kakao.com/_your_channel_id",
  telegramUrl = "https://t.me/your_telegram_channel",
}: CustomerServiceModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black/50 z-[200] animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* 모달 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 rounded-t-3xl z-[201] animate-[slideUp_0.3s_ease-out] max-h-[80vh] overflow-y-auto max-w-3xl mx-auto">
        <div className="p-6">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">고객센터</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 상담 채널 */}
          <div className="space-y-3">
            {/* 카카오톡 채널 */}
            <a
              href={kakaoChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-yellow-400 rounded-xl hover:bg-yellow-300 transition-colors"
            >
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="#3C1E1E"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3Z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  카카오톡 채널
                </h3>
                <p className="text-sm text-gray-700">카카오톡으로 문의하기</p>
              </div>
              <svg
                className="w-5 h-5 text-gray-900"
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
            </a>

            {/* 텔레그램 */}
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.87 8.8c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">텔레그램</h3>
                <p className="text-sm text-blue-100">텔레그램으로 문의하기</p>
              </div>
              <svg
                className="w-5 h-5 text-white"
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
            </a>
          </div>

          {/* 안내 문구 */}
          <div className="mt-6 p-4 bg-gray-700 rounded-xl">
            <p className="text-sm text-gray-300 text-center">
              24시간 운영중입니다.
              <br />
              문의사항이 있으시면 언제든지 연락주세요!
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
