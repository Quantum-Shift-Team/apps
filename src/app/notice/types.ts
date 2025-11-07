export type Category =
  | "가입"
  | "인증"
  | "수수료"
  | "페이백"
  | "출금"
  | "입금"
  | "거래"
  | "계정";

export interface Question {
  id: number;
  title: string;
  categories: readonly Category[];
  answer?: string;
}

