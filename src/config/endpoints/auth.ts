import { BASE_URL } from "@services/axios";

export const authEndpoints = {
  login: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/auth/register`,
} as const;
