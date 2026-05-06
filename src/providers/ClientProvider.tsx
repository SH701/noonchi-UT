"use client";

import { useQueryClient } from "@tanstack/react-query";
import { InternalAxiosRequestConfig } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { axios } from "@/api/common";

interface Props {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: Props) {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const prevStatus = useRef<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    gtag("event", "page_view", { page_path: pathname });
  }, [pathname]);

  useEffect(() => {
    const reqInterceptor = axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const accessToken = session?.accessToken;

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    return () => {
      axios.interceptors.request.eject(reqInterceptor);
    };
  }, [session]);

  useEffect(() => {
    if (
      prevStatus.current === "loading" &&
      status === "authenticated" &&
      session?.accessToken
    ) {
      queryClient.invalidateQueries();
    }

    if (
      prevStatus.current === "authenticated" &&
      status === "unauthenticated"
    ) {
      queryClient.clear();
      gtag("set", { user_id: undefined });
    }

    if (
      prevStatus.current === "unauthenticated" &&
      status === "authenticated" &&
      session?.accessToken
    ) {
      queryClient.invalidateQueries();
    }

    if (status === "authenticated" && session?.user?.id) {
      gtag("set", { user_id: String(session.user.id) });
    }

    prevStatus.current = status;
  }, [status, queryClient, session]);

  return <>{children}</>;
}