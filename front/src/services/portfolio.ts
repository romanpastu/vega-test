import { API_ENDPOINTS } from "@/constants/api";

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

    getPortfolios: async (): Promise<API.Portfolio[]> => {
        const response = await fetch(API_ENDPOINTS.dashboard.portfolios, {
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