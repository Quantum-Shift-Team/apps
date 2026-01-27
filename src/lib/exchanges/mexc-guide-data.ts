/**
 * MEXC 거래소 가입 가이드 데이터
 */
export interface GuideStep {
  image: string;
  title: string;
  description: string;
}

export const MEXC_GUIDE_STEPS: GuideStep[] = [
  {
    image: "/exchanges/mexc/mexc_1_signup.png",
    title: "가입 시작",
    description: "이메일 또는 전화번호를 입력하고, 추천인 코드 3cuy8을 입력해주세요!",
  },
  {
    image: "/exchanges/mexc/mexc_2_code.png",
    title: "인증 코드 입력",
    description: "이메일 또는 전화번호로 받은 인증 코드를 입력해주세요!",
  },
  {
    image: "/exchanges/mexc/mexc_3_password.png",
    title: "비밀번호 설정",
    description: "안전한 비밀번호를 설정해주세요!",
  },
  {
    image: "/exchanges/mexc/mexc_4_app.png",
    title: "가입 완료",
    description: "가입이 완료되었습니다! 이제 MEXC에서 거래를 시작할 수 있어요!",
  },
];
