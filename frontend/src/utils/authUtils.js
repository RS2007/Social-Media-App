import Cookies from "js-cookie";

/**
 * 
 * @returns {(!{username:string,fullName:string} | {})}
 */
export const getUser = () => {
  return JSON.parse(Cookies.get("USER_DETAILS") || "{}");
};
/**
 * 
 * @returns {boolean} Returns whether the user is logged in 
 */
export const isLoggedIn = () => {
  return Object.values(getUser()).length !== 0;
};
