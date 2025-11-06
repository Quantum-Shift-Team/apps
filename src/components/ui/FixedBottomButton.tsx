import Link from "next/link";

interface FixedBottomButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  bgOpacity?: number; // 0-100 사이의 값
  tipMessage?: string; // 말풍선에 표시할 메시지
}

export function FixedBottomButton({
  href,
  onClick,
  children,
  className = "w-[90%] py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium",
  disabled = false,
  bgOpacity = 30,
  tipMessage,
}: FixedBottomButtonProps) {
  const buttonClassName = `block ${className} mx-auto ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;
  const isExternalUrl = href?.startsWith("http");
  const bgStyle =
    bgOpacity < 100
      ? { backgroundColor: `rgba(17, 24, 39, ${bgOpacity / 100})` } // gray-900 with opacity
      : {};

  return (
    <div
      className="fixed bottom-0 left-0 right-0 px-4 pb-4 z-50"
      style={bgStyle}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center relative">
          {tipMessage && (
            <div className="absolute -top-5 right-[5%] z-100 animate-bounce">
              <div className="relative bg-white text-black text-[11px] px-3 py-1 rounded-2xl shadow-lg whitespace-nowrap border border-gray-700">
                {tipMessage}
                {/* 말풍선 꼬리 */}
                <div className="absolute bottom-0 right-4 transform translate-y-full">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                </div>
              </div>
            </div>
          )}
          {href ? (
            isExternalUrl ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClassName}
                onClick={onClick}
              >
                {children}
              </a>
            ) : (
              <Link href={href} className={buttonClassName} onClick={onClick}>
                {children}
              </Link>
            )
          ) : (
            <button
              onClick={onClick}
              disabled={disabled}
              className={buttonClassName}
            >
              {children}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
