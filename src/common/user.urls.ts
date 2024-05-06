/**
 * These functions define various endpoints related to user operations in a TypeScript application.
 * @param {string} mobile - The `mobile` parameter is a string representing a user's mobile number.
 * @returns The functions are returning strings that represent different API endpoints related to user
 * management in a system.
 */
export const SIMPLE_SEARCH_USER_MOBILE = (mobile: string) => {
  return `users/simple-search-mobile-user-exist/${mobile}`;
};
export const SEND_OTP = (mobile: string) => {
  return `users/send-otp/${mobile}`;
};
export const LOGIN_USER_WITH_OTP = `users/login-user-with-otp`;
export const LIKE_USER = (_id: string) => {
  return `users/like/${_id}`;
};
export const SAVE_WHOLE_DATA = `users/saveWholeData`;
export const USER_LISTING = `users/listing`;
export const USER_PROFILE = (_id: string) => {
  return `users/${_id}`;
};
export const USER_CREATE = `users`;
export const USER_LOGIN = `users/login`;
export const USER_LOGIN_WITH_PASSWORD = `users/login-user-with-password`;
export const UPDATE_USER = (_id: string) => {
  return `users/${_id}`;
};
