export const getAge = (birthdate: string) => {
  const currentYear = new Date().getFullYear();
  const birthYear = parseInt(birthdate.substring(0, 4));
  return currentYear - birthYear;
};
export const getRelativeTime = (createdAt: string) => {
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

  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 2) return "1일 전";

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