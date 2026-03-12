import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import z from "zod";
import { AuthRes } from "@/types/auth";
import { User as AppUser } from "@/types/user";

async function refreshAccessToken(refreshToken: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to refresh token");
    }

    const data: AuthRes = await res.json();
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      user: data.user,
    };
  } catch (error) {
    console.error("Refresh token error:", error);
    return null;
  }
}

const ACCESS_TOKEN_EXPIRES = 60 * 1000 * 60;

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(1) })
          .safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            },
          );

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            console.log("Login error response:", errorData);
            return null;
          }

          const data: AuthRes = await res.json();

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.nickname,
            birthDate: data.user.birthDate,
            image: data.user.profileImageUrl,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            user: data.user,
          };
        } catch (e) {
          console.error("Login error:", e);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (trigger === "update" && token.accessToken) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
            {
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
              },
            },
          );
          if (res.ok) {
            token.user = await res.json();
          }
        } catch (e) {
          console.error("Failed to refresh user info on update:", e);
        }
        return token;
      }
      // 최초 로그인 시 토큰 저장
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = user.user;
        token.accessTokenExpires = Date.now() + ACCESS_TOKEN_EXPIRES;
      }

      // 토큰이 아직 유효하면 그대로 반환
      if (Date.now() < (token.accessTokenExpires as number)) {
        // token.user가 없으면 accessToken으로 유저 정보 복구
        if (!token.user && token.accessToken) {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
              {
                headers: {
                  Authorization: `Bearer ${token.accessToken}`,
                },
              },
            );
            if (res.ok) {
              token.user = await res.json();
            }
          } catch (e) {
            console.error("Failed to fetch user info:", e);
          }
        }
        return token;
      }
      // 토큰 만료 시 갱신 시도
      if (token.refreshToken && typeof token.refreshToken === "string") {
        const refreshed = await refreshAccessToken(token.refreshToken);
        if (refreshed) {
          token.accessToken = refreshed.accessToken;
          token.refreshToken = refreshed.refreshToken;
          token.user = refreshed.user;
          token.accessTokenExpires = Date.now() + ACCESS_TOKEN_EXPIRES;
        } else {
          token.error = "RefreshTokenError";
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      if (token.user) {
        const appUser = token.user as AppUser;

        session.user = {
          ...session.user,
          ...appUser,
          id: String(appUser.id),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});
