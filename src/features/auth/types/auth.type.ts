import { User } from "../../../types/user";

export interface AuthRes {
  accessToken: string;
  refreshToken: string;
  user: User;
  level: number;
  // true only on the request that created the account (signup / first OAuth).
  isNewUser?: boolean;
}
export interface SignupReq {
  email: string;
  password: string;
  nickname: string;
  gender: "NONE";
  birthDate: string;
  profileImageUrl?: string;
}

export interface LoginReq {
  email: string;
  password: string;
}
