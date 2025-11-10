import { useState } from "react";
import { readCookieValue, writeCookieValue } from "./cookie";

const USER_ID_COOKIE = "@brainflip_user_id";

const getUserIdFromCookie = () => {
  let userId = readCookieValue(USER_ID_COOKIE);

  if (!userId) {
    userId = crypto.randomUUID();
    writeCookieValue(USER_ID_COOKIE, userId);
  }

  return userId;
};

export const useUserId = (): string => {
  const [userId] = useState<string>(() => getUserIdFromCookie());

  return userId;
};
