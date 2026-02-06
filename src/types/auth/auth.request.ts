export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
  gender: "MALE" | "FEMALE";
  birthDate: string;
  profileImageUrl?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
