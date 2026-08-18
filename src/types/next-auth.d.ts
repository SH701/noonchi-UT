import { User as AppUser } from "@/types/user/user.type";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    // Optional, backend-provided: true on the first session after account
    // creation. Used to emit sign_up vs login for OAuth. Absent today.
    // TODO(backend __ASK_JINSUNG__): populate from the auth response.
    isNewUser?: boolean;
    user: AppUser &
      Omit<DefaultSession["user"], "id"> & {
        id: string | number;
      };
  }

  interface User {
    id: number;
    accessToken: string;
    refreshToken: string;
    user: AppUser;
    isNewUser?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    user: AppUser;
    accessTokenExpires: number;
    error?: string;
    isNewUser?: boolean;
  }
}
