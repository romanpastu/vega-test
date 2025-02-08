import { API_ENDPOINTS } from '@/constants/api'
import { createApiService } from '@/lib/api/base'

export type LoginCredentials = {
  username: string
  password: string
}

export type LoginResponse = {
  token: string
}

const baseApi = createApiService()

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return baseApi.post<LoginResponse>(API_ENDPOINTS.auth.login, credentials)
  }
} as const 