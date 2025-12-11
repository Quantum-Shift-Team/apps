/**
 * OKX 거래소 가입 가이드 데이터
 */
export interface GuideStep {
  image: string;
  title: string;
  description: string;
}

export const OKX_GUIDE_STEPS: GuideStep[] = [
  {
    image: "/exchanges/okx/okx_1_signup_guide.png",
    title: "가입 시작",
    description: "OKX 가입을 시작합니다! 이메일 주소를 입력해주세요!",
  },
  {
    image: "/exchanges/okx/okx_2_app_main_page.jpeg",
    title: "앱 메인 페이지",
    description: "어플을 설치하시면 이 페이지가 나오게 됩니다!",
  },
  {
    image: "/exchanges/okx/okx_3_where_do_you_live.jpeg",
    title: "거주지 선택",
    description: "거주 국가를 선택해주세요!",
  },
  {
    image: "/exchanges/okx/okx_4_whats_your_email.jpeg",
    title: "이메일 입력",
    description: "'Have a referral code?'를 눌러주세요!",
  },
  {
    image: "/exchanges/okx/okx_5_referral_code.jpeg",
    title: "코드: 40463468",
    description: "추천인 코드를 입력하고 Confirm 버튼을 눌러주세요!",
  },
  {
    image: "/exchanges/okx/okx_6_whats_your_phone_number.jpeg",
    title: "전화번호를 입력해주세요",
    description: "전화번호를 입력하고 Continue 버튼을 눌러주세요!",
  },
  {
    image: "/exchanges/okx/okx_7_verified_code.jpeg",
    title: "인증 코드를 입력해주세요",
    description: "전화번호로 받은 인증 코드를 입력해주세요!",
  },
  {
    image: "/exchanges/okx/okx_8_passkeys.jpeg",
    title: "Passkeys 설정",
    description: "보안을 위해 설정하셔도 되지만 필수는 아닙니다! 넘어가시려면 오른쪽 위에 x를 눌러주세요.",
  },
  {
    image: "/exchanges/okx/okx_8-1_passkeys_code.jpeg",
    title: "Passkeys 코드 확인",
    description: "Passkeys를 설정하시려면 이 단계를 진행해주세요!",
  },
  {
    image: "/exchanges/okx/okx_9_confirm_where_you_live.jpeg",
    title: "거주지를 확인해주세요",
    description: "아래 버튼을 누르고 넘어가세요!",
  },
  {
    image: "/exchanges/okx/okx_10_select_an_id_type.jpeg",
    title: "신분증 종류를 선택해주세요",
    description: "운전면허증, 신분증, 여권 중 하나를 선택하고 진행해주세요!",
  },
  {
    image: "/exchanges/okx/okx_11_.jpeg",
    title: "얼굴 사진 촬영",
    description: "얼굴 사진을 촬영해주세요!",
  },
  {
    image: "/exchanges/okx/okx_12.jpeg",
    title: "리뷰중입니다",
    description: "리뷰가 완료되면 가입이 완료됩니다!",
  },
  {
    image: "/exchanges/okx/okx_13.jpeg",
    title: "주소 입력",
    description: "주소만 입력하면 가입이 끝나요!",
  },
];

