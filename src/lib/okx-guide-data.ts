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
    description: "Passkeys를 설정하여 보안을 강화하세요!",
  },
  {
    image: "/exchanges/okx/okx_8-1_passkeys_code.jpeg",
    title: "Passkeys 코드 확인",
    description: "Passkeys 코드를 확인하고 진행해주세요!",
  },
  {
    image: "/exchanges/okx/okx_9_confirm_where_you_live.jpeg",
    title: "거주지를 확인해주세요",
    description: "거주 국가를 선택하고 확인해주세요!",
  },
  {
    image: "/exchanges/okx/okx_10_select_an_id_type.jpeg",
    title: "신분증 종류를 선택해주세요",
    description: "신분증, 운전면허증, 여권 중 하나를 선택해주세요!",
  },
  {
    image: "/exchanges/okx/okx_11_.jpeg",
    title: "신분증 정보 입력",
    description: "신분증 정보를 입력하고 진행해주세요!",
  },
  {
    image: "/exchanges/okx/okx_12.jpeg",
    title: "신분증 사진 촬영",
    description: "신분증 앞면 사진을 촬영해주세요!",
  },
  {
    image: "/exchanges/okx/okx_13.jpeg",
    title: "가입 완료",
    description: "모든 절차가 완료되었습니다!",
  },
];

