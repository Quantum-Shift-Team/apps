"use client";

import { BackHeader } from "@/components/layout/BackHeader";
import { LAYOUT_CONSTANTS } from "@/lib/constants";
import { usePathname } from "next/navigation";

export default function ExchangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 경로에 따라 이전 페이지 경로 설정
  const getBackLink = () => {
    if (pathname?.includes("/exchange/complete/")) {
      const name = pathname.split("/exchange/complete/")[1];
      return name ? `/exchange/id-document-capture/${name}` : "/";
    }
    if (pathname?.includes("/exchange/id-document-capture/")) {
      const name = pathname.split("/exchange/id-document-capture/")[1];
      return name ? `/exchange/id-document-upload/${name}` : "/";
    }
    if (pathname?.includes("/exchange/id-document-upload/")) {
      const name = pathname.split("/exchange/id-document-upload/")[1];
      return name ? `/exchange/document-verification/${name}` : "/";
    }
    if (pathname?.includes("/exchange/document-verification/")) {
      const name = pathname.split("/exchange/document-verification/")[1];
      return name ? `/exchange/identify/${name}` : "/";
    }
    if (pathname?.includes("/exchange/verified/")) {
      const name = pathname.split("/exchange/verified/")[1];
      return name ? `/exchange/signup/${name}` : "/";
    }
    if (pathname?.includes("/exchange/identify/")) {
      const name = pathname.split("/exchange/identify/")[1];
      return name ? `/exchange/verified/${name}` : "/";
    }
    if (pathname?.includes("/exchange/signup/")) {
      const name = pathname.split("/exchange/signup/")[1];
      return name ? `/exchange/newpage/${name}` : "/";
    }
    return "/";
  };

  // 가입 관련 페이지에서만 고객센터 버튼 표시
  const shouldShowCustomerService =
    pathname?.includes("/exchange/signup/") ||
    pathname?.includes("/exchange/verified/") ||
    pathname?.includes("/exchange/identify/") ||
    pathname?.includes("/exchange/document-verification/") ||
    pathname?.includes("/exchange/id-document-upload/") ||
    pathname?.includes("/exchange/id-document-capture/") ||
    pathname?.includes("/exchange/complete/");

  return (
    <div>
      <BackHeader
        backLink={getBackLink()}
        showCustomerService={shouldShowCustomerService}
      />
      <main
        className="pb-24"
        style={{
          paddingTop: `${LAYOUT_CONSTANTS.BACK_HEADER_HEIGHT * 0.25}rem`,
        }}
      >
        {children}
      </main>
    </div>
  );
}
