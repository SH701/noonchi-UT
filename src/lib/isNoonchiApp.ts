export function isNoonchiApp(): boolean {
  if (typeof window === "undefined") return false;
  return (
    /NoonchiApp/i.test(navigator.userAgent) || window.isNoonchiApp === true
  );
}
