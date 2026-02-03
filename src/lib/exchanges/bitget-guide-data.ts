/**
 * Bitget 거래소 가입 가이드 데이터
 */
export interface GuideStep {
  image: string;
  title: string;
  description: string;
}

export const BITGET_GUIDE_STEPS: GuideStep[] = [
  {
    image: "/exchanges/bitget/bitget_1_welcome.jpg",
    title: "Bitget 환영 화면",
    description: "Bitget에 오신 것을 환영합니다! 최대 6200 USDT 환영 선물을 받아보세요!",
  },
  {
    image: "/exchanges/bitget/bitget_2_email_password.jpg",
    title: "이메일/비밀번호 입력",
    description: "이메일 또는 전화번호와 비밀번호를 입력하고, 추천인 코드 AK0H5Z9B를 입력해주세요!",
  },
  {
    image: "/exchanges/bitget/bitget_3_select_in_order_not_a_robot.jpg",
    title: "로봇 확인 (캡차)",
    description: "보안을 위해 표시된 순서대로 아이콘을 선택해주세요!",
  },
  {
    image: "/exchanges/bitget/bitget_4_email_verification_code.jpg",
    title: "이메일 인증 코드 입력",
    description: "이메일로 받은 6자리 인증 코드를 입력해주세요!",
  },
  {
    image: "/exchanges/bitget/bitget_5_check_maybe_later.jpg",
    title: "설명 영상 확인",
    description: "설명 영상을 확인하거나 'Maybe later'를 눌러주세요!",
  },
  {
    image: "/exchanges/bitget/bitget_6_now_download_app.jpg",
    title: "앱 다운로드 안내",
    description: "앱 다운로드 안내가 나오면 'Open' 버튼을 눌러주세요!",
  },
];
