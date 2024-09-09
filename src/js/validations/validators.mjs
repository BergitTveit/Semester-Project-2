export const usernameValidation = (value) => value.length >= 5;
export const emailValidation = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const passwordValidation = (value) => value.length >= 8;
