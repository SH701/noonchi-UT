import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/landing", "/preview", "/preview/end", "/lab", "/service"],
      disallow: "/",
    },
    sitemap: "https://noonchi.ai.kr/sitemap.xml",
  };
}
