export const getAge = (birthdate: string) => {
  const currentYear = new Date().getFullYear();
  const birthYear = parseInt(birthdate.substring(0, 4));
  return currentYear - birthYear;
};
export const getTime = (createdAt: string) => {
  const date = new Date(createdAt);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);
  return `${dd}/${mm}/${yy}`;
};