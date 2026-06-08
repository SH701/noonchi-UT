import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const publicPaths = [
    "/",
    "/landing",
    "/preview",
    "/preview/end",
    "/lab",
    "/service",
  ];

  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "CCBot",
    "Applebot-Extended",
    "Meta-ExternalAgent",
    "cohere-ai",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: publicPaths,
        disallow: "/",
      },
      ...aiBots.map((userAgent) => ({
        userAgent,
        allow: publicPaths,
        disallow: "/",
      })),
    ],
    sitemap: "https://noonchi.ai.kr/sitemap.xml",
    host: "https://noonchi.ai.kr",
  };
}
