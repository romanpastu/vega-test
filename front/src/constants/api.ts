export const API_BASE_URL = 'http://localhost:3000'

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
  },
} as const 