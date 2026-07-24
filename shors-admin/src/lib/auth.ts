import Cookies from "js-cookie";

export const getAuthToken = () => {
  return Cookies.get("token") ?? null;
};

export const setAuthToken = (token: string) => {
  Cookies.set("token", token, {
    expires: 7,
    sameSite: "lax",
  });
};

export const clearAuthToken = () => {
  Cookies.remove("token");
};