import Link from "next/link";

interface FixedBottomButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  bgOpacity?: number; // 0-100 사이의 값
}

export function FixedBottomButton({ 
  href, 
  onClick,
  children, 
  className = "w-[90%] py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium",
  disabled = false,
  bgOpacity = 100
}: FixedBottomButtonProps) {
  const buttonClassName = `block ${className} mx-auto ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  const isExternalUrl = href?.startsWith('http');
  const bgStyle = bgOpacity < 100 
    ? { backgroundColor: `rgba(17, 24, 39, ${bgOpacity / 100})` } // gray-900 with opacity
    : {};
  
  return (
    <div className="fixed bottom-0 left-0 right-0 px-4 pb-4 z-50" style={bgStyle}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
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
              <Link 
                href={href}
                className={buttonClassName}
                onClick={onClick}
              >
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
