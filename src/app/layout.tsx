import "./globals.css";
import { Metadata, Viewport } from "next";
import Script from "next/script";
import { Toaster } from "@/components/ui/toast/toast";
import {
  ClientProvider,
  QueryProvider,
  AuthProvider,
  I18nProvider,
} from "@/providers";
import ModalRender from "@/components/modal/ModalRender";
import BannerModal from "@/components/modal/BannerModal";
import { SITE_DESCROPTION } from "@/constants/description";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://noonchi.ai.kr"),
  title: "Noonchi.ai",
  description: SITE_DESCROPTION,
  manifest: "/manifest.json",
  verification: {
    google: "_IjXLJhIbgErRuIUCVKImK7sfJ04b0gXDnZBMjWQazk",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Noonchi.ai",
  },
  icons: {
    apple: "/icons/icon-180.png",
  },
  openGraph: {
    title: "Noonchi.ai",
    description: SITE_DESCROPTION,
    url: "https://noonchi.ai.kr",
    siteName: "Noonchi",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noonchi.ai",
    description: SITE_DESCROPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className="min-h-dvh w-full">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
        <AuthProvider>
          <QueryProvider>
            <I18nProvider>
              <ClientProvider>
                <div className="flex h-full min-h-dvh w-full justify-center">
                  <div className="max-w-150 bg-gradient-primary w-full md:shadow-xl">
                    {children}
                  </div>
                </div>
                <Toaster />
                <ModalRender />
                <BannerModal />
              </ClientProvider>
            </I18nProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
