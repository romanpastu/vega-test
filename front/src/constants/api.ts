// In production (Docker), replace 'backend' with 'localhost' for browser access
const apiUrl = import.meta.env.VITE_API_URL?.replace('backend', 'localhost') || 'http://localhost:3000';

export const API_BASE_URL = apiUrl;

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