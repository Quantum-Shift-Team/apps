/**
 * Bybit 거래소 가입 가이드 데이터
 */
export interface GuideStep {
  image: string;
  title: string;
  description: string;
}

export const BYBIT_GUIDE_STEPS: GuideStep[] = [
  {
    image: "/exchanges/bybit/bybit_1_main.png",
    title: "Bybit 메인 페이지",
    description: "Bybit 거래소에 오신 것을 환영합니다! 'Sign Up' 버튼을 눌러 가입을 시작해주세요!",
  },
  {
    image: "/exchanges/bybit/bybit_2_signup.png",
    title: "거주 국가 선택",
    description: "거주 국가를 선택하고, 약관에 동의한 후 'Create Account' 버튼을 눌러주세요!",
  },
  {
    image: "/exchanges/bybit/bybit_3_email.png",
    title: "이메일/전화번호 입력",
    description: "이메일 또는 전화번호를 입력하고, 추천인 코드가 있다면 입력해주세요! (선택사항)",
  },
  {
    image: "/exchanges/bybit/bybit_4_app.png",
    title: "신원 확인 안내",
    description: "가입이 완료되었습니다! 이제 신원 확인을 진행해주세요. 'Verify Now' 버튼을 눌러주세요!",
  },
  {
    image: "/exchanges/bybit/bybit_5_identify_verification.png",
    title: "신원 확인 진행",
    description: "거주 국가/지역을 확인하고, 약관에 동의한 후 'Confirm' 버튼을 눌러 신원 확인을 완료해주세요!",
  },
];
