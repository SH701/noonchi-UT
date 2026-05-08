export const getAge = (birthdate: string) => {
  const currentYear = new Date().getFullYear();
  const birthYear = parseInt(birthdate.substring(0, 4));
  return currentYear - birthYear;
};

type Locale = "en" | "ja" | "ru" | "es";

const relativeTimeLabels: Record<
  Locale,
  {
    justNow: string;
    minutesAgo: (n: number) => string;
    hoursAgo: (n: number) => string;
    oneDayAgo: string;
  }
> = {
  en: {
    justNow: "just now",
    minutesAgo: (n) => `${n}m ago`,
    hoursAgo: (n) => `${n}h ago`,
    oneDayAgo: "1d ago",
  },
  ja: {
    justNow: "たった今",
    minutesAgo: (n) => `${n}分前`,
    hoursAgo: (n) => `${n}時間前`,
    oneDayAgo: "1日前",
  },
  ru: {
    justNow: "только что",
    minutesAgo: (n) => `${n} мин. назад`,
    hoursAgo: (n) => `${n} ч. назад`,
    oneDayAgo: "1 д. назад",
  },
  es: {
    justNow: "ahora mismo",
    minutesAgo: (n) => `hace ${n} min`,
    hoursAgo: (n) => `hace ${n} h`,
    oneDayAgo: "hace 1 día",
  },
};

export const getRelativeTime = (createdAt: string, locale: Locale = "en") => {
  const normalized =
    createdAt.endsWith("Z") || createdAt.includes("+")
      ? createdAt
      : createdAt + "Z";
  const date = new Date(normalized);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 1000 / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const labels = relativeTimeLabels[locale];

  if (diffMin < 1) return labels.justNow;
  if (diffMin < 60) return labels.minutesAgo(diffMin);
  if (diffHour < 24) return labels.hoursAgo(diffHour);
  if (diffDay < 2) return labels.oneDayAgo;

  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yy}/${mm}/${dd}`;
};

export const getTime = (createdAt: string) => {
  const normalized =
    createdAt.endsWith("Z") || createdAt.includes("+")
      ? createdAt
      : createdAt + "Z";
  const date = new Date(normalized);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);
  return `${yy}/${mm}/${dd}`;
};