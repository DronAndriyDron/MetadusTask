import { SESSION_EXPIRED } from '../constants/constants';

export function generateExpirationDate() {
  return Date.now() + SESSION_EXPIRED;
}
