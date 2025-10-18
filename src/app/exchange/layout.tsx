import { BackHeader } from "@/components/layout/BackHeader";
import { LAYOUT_CONSTANTS } from "@/lib/constants";

export default function ExchangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900">
      <BackHeader backLink="/" />
      <main 
        className="pb-24"
        style={{ paddingTop: `${LAYOUT_CONSTANTS.BACK_HEADER_HEIGHT * 0.25}rem` }}
      >
        {children}
      </main>
    </div>
  );
}
