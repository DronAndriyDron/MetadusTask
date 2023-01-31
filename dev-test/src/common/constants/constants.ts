export const VALIDATE_USER_NAME = /^[^`'"]*$/;
export const ADDITIONAL_VALIDATE_USER_NAME =
  /^[\w.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
export const VALIDATE_PASSWORD =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
export const SESSION_EXPIRED = 1440000;
