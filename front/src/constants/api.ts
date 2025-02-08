export const API_BASE_URL = 'http://localhost:3000'

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
  },
  dashboard: {
    portfolios: `${API_BASE_URL}/portfolios`,
    prices: `${API_BASE_URL}/prices`,
    assets: `${API_BASE_URL}/assets`,
  }
} as const 