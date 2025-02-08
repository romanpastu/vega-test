import { API_ENDPOINTS } from "@/constants/api";
import { createApiService } from "@/lib/api/base";

export type GetPortfoliosParams = {
    from?: string;
    to?: string;
}

const baseApi = createApiService();

export const portfolioService = {
    getAssets: async (): Promise<API.Asset[]> => {
        return baseApi.get<API.Asset[]>(API_ENDPOINTS.dashboard.assets);
    },

    getPrices: async (): Promise<API.Price[]> => {
        return baseApi.get<API.Price[]>(API_ENDPOINTS.dashboard.prices);
    },

    getPortfolios: async (params?: GetPortfoliosParams): Promise<API.Portfolio[]> => {
        return baseApi.get<API.Portfolio[]>(API_ENDPOINTS.dashboard.portfolios, {
            params
        });
    }
} as const; 