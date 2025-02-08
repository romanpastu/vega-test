import { API_ENDPOINTS } from "@/constants/api";

interface GetPortfoliosParams {
    from?: string; 
    to?: string; 
}

export const portfolioService = {
    getAssets: async (): Promise<API.Asset[]> => {
        const response = await fetch(API_ENDPOINTS.dashboard.assets, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch assets');
        }

        return response.json();
    },

    getPrices: async (): Promise<API.Price[]> => {
        const response = await fetch(API_ENDPOINTS.dashboard.prices, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch prices');
        }

        return response.json();
    },

    getPortfolios: async (params?: GetPortfoliosParams): Promise<API.Portfolio[]> => {
        const queryParams = new URLSearchParams();
        if (params?.from) queryParams.append('from', params.from);
        if (params?.to) queryParams.append('to', params.to);

        const url = `${API_ENDPOINTS.dashboard.portfolios}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch portfolios');
        }

        return response.json();
    },
} as const 