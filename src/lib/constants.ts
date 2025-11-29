// 레이아웃 관련 상수
export const LAYOUT_CONSTANTS = {
  HEADER_HEIGHT: 16, // tailwind class: h-18
  BACK_HEADER_HEIGHT: 12 // tailwind class: h-12
} as const;

// 앱 정보 상수
export const APP_INFO = {
  PLATFORM_NAME: "암호화폐 거래소 비교 플랫폼",
  VERSION: "1.0.1",
  getVersionText: () => `${APP_INFO.PLATFORM_NAME} version ${APP_INFO.VERSION}`,
} as const;
