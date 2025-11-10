export const readCookieValue = (name: string) => {
  if (typeof document === "undefined") {
    return undefined;
  }

  const pattern = new RegExp(`(?:^|;\\s*)${name}=([^;]*)`);
  const matches = document.cookie.match(pattern);

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const writeCookieValue = (name: string, value: string) => {
  if (typeof document === "undefined") {
    return;
  }

  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; path=/; expires=${expires.toUTCString()}`;
};
