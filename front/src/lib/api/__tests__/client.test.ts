import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '@/constants/api';
import { AxiosError, AxiosResponse, AxiosHeaders, InternalAxiosRequestConfig } from 'axios';

interface AxiosInterceptorManagerWithHandlers<V> {
  handlers: Array<{
    fulfilled: (value: V) => V | Promise<V>;
    rejected: (error: unknown) => unknown;
  }>;
}

describe('API Client', () => {
  const mockToken = 'test-jwt-token';
  const mockLocalStorage = {
    getItem: vi.fn(),
    removeItem: vi.fn(),
  };

  // Mock localStorage
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
    });
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    });

    // Reset all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Request Interceptor', () => {
    it('should add Authorization header when JWT token exists', async () => {
      mockLocalStorage.getItem.mockReturnValue(mockToken);

      // Get the request interceptor from axios instance
      const requestInterceptor = (apiClient.interceptors.request as unknown as AxiosInterceptorManagerWithHandlers<InternalAxiosRequestConfig>).handlers[0].fulfilled;
      
      // Simulate interceptor execution with a mock request config
      const modifiedConfig = await requestInterceptor({
        url: '/test',
        method: 'GET',
        headers: new AxiosHeaders()
      });

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('jwt');
      expect(modifiedConfig.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    });

    it('should not add Authorization header when JWT token does not exist', async () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      // Get the request interceptor from axios instance
      const requestInterceptor = (apiClient.interceptors.request as unknown as AxiosInterceptorManagerWithHandlers<InternalAxiosRequestConfig>).handlers[0].fulfilled;
      
      // Simulate interceptor execution with a mock request config
      const modifiedConfig = await requestInterceptor({
        url: '/test',
        method: 'GET',
        headers: new AxiosHeaders()
      });

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('jwt');
      expect(modifiedConfig.headers.get('Authorization')).toBeUndefined();
    });
  });

  describe('Response Interceptor', () => {
    it('should handle 401 error and redirect to login page', async () => {
      const mockError = new AxiosError(
        'Unauthorized',
        '401',
        { // Valid Axios request config
          url: '/test',
          headers: new AxiosHeaders(),
          method: 'GET'
        },
        undefined,
        {
          status: 401,
          data: 'Unauthorized',
          headers: {},
          statusText: 'Unauthorized',
          config: { url: '/test' }
        } as AxiosResponse
      );

      // Get the response interceptor's error handler
      const errorHandler = (
        apiClient.interceptors.response as unknown as AxiosInterceptorManagerWithHandlers<AxiosResponse>
      ).handlers[0].rejected;
      
      // Execute the error handler with the mock error
      await expect(errorHandler(mockError)).rejects.toThrow();

      // Verify cleanup and redirect
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('jwt');
      expect(window.location.href).toBe('/login');
    });

    it('should not redirect on 401 error if it is a login request', async () => {
      const mockError = new AxiosError(
        'Unauthorized',
        '401',
        undefined,
        undefined,
        {
          status: 401,
          data: 'Unauthorized',
          headers: {},
          statusText: 'Unauthorized',
          config: { url: API_ENDPOINTS.auth.login }
        } as AxiosResponse
      );
      mockError.response = {
        status: 401,
        data: 'Unauthorized',
        headers: {},
        statusText: 'Unauthorized',
        config: { url: API_ENDPOINTS.auth.login }
      } as AxiosResponse;

      vi.spyOn(apiClient, 'request').mockRejectedValueOnce(mockError);

      try {
        await apiClient.request({
          url: API_ENDPOINTS.auth.login,
          method: 'POST',
        });
        // Should not reach here
        expect(true).toBe(false);
      } catch (error) {
        const axiosError = error as AxiosError;
        expect(axiosError.response?.status).toBe(401);
        expect(mockLocalStorage.removeItem).not.toHaveBeenCalled();
        expect(window.location.href).not.toBe('/login');
      }
    });

    it('should pass through non-401 errors', async () => {
      const mockError = new AxiosError(
        'Internal Server Error',
        '500',
        undefined,
        undefined,
        {
          status: 500,
          data: 'Internal Server Error',
          headers: {},
          statusText: 'Internal Server Error',
          config: { url: '/test' }
        } as AxiosResponse
      );
      mockError.response = {
        status: 500,
        data: 'Internal Server Error',
        headers: {},
        statusText: 'Internal Server Error',
        config: { url: '/test' }
      } as AxiosResponse;

      vi.spyOn(apiClient, 'request').mockRejectedValueOnce(mockError);

      try {
        await apiClient.request({
          url: '/test',
          method: 'GET',
        });
        // Should not reach here
        expect(true).toBe(false);
      } catch (error) {
        const axiosError = error as AxiosError;
        expect(axiosError.response?.status).toBe(500);
        expect(mockLocalStorage.removeItem).not.toHaveBeenCalled();
        expect(window.location.href).not.toBe('/login');
      }
    });
  });
});
