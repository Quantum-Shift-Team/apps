import Link from "next/link";

interface FixedBottomButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function FixedBottomButton({ 
  href, 
  onClick,
  children, 
  className = "w-[90%] py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium",
  disabled = false
}: FixedBottomButtonProps) {
  const buttonClassName = `block ${className} mx-auto ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          {href ? (
            <Link 
              href={href}
              className={buttonClassName}
            >
              {children}
            </Link>
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
