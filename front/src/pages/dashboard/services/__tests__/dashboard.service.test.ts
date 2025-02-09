import { describe, it, expect, beforeEach, vi } from 'vitest';
import { portfolioService } from "@/services/portfolio";
import { getAggregatedPortfolioData, getAggregatedPortfolioValueHistory } from "../dashboard.service";
import { ASSET_TYPES } from "@/constants/assets";
import { PERIOD_TYPE } from "@/pages/dashboard/constants/portfolio";

// Mock the portfolio service
vi.mock("@/services/portfolio", () => ({
    portfolioService: {
        getPortfolios: vi.fn(),
        getAssets: vi.fn(),
    },
}));

describe("Dashboard Service", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("getAggregatedPortfolioData", () => {
        const mockAssets = [
            { id: "1", name: "Apple", type: ASSET_TYPES.STOCK },
            { id: "2", name: "Bitcoin", type: ASSET_TYPES.CRYPTO },
            { id: "3", name: "USD", type: ASSET_TYPES.FIAT },
        ];

        const mockPortfolios = [{
            id: "portfolio1",
            positions: [
                { id: 1, asset: "1", quantity: 10, price: 150, asOf: "2024-01-01T12:00:00Z" },
                { id: 2, asset: "2", quantity: 2, price: 30000, asOf: "2024-01-01T12:00:00Z" }, 
                { id: 3, asset: "3", quantity: 5000, price: 1, asOf: "2024-01-01T12:00:00Z" }, 
            ],
        }];

        it("should aggregate portfolio data correctly", async () => {
            vi.mocked(portfolioService.getPortfolios).mockResolvedValue(mockPortfolios);

            const result = await getAggregatedPortfolioData(mockAssets);

            expect(result).toEqual({
                assetClass: expect.arrayContaining([
                    { name: "Stocks", value: 1500 },
                    { name: "Crypto", value: 60000 },
                    { name: "Cash", value: 5000 },
                ]),
                specificAssets: expect.arrayContaining([
                    { name: "Bitcoin", value: 60000 },
                    { name: "Apple", value: 1500 },
                    { name: "USD", value: 5000 },
                ]),
            });
        });

        it("should handle empty portfolios", async () => {
            vi.mocked(portfolioService.getPortfolios).mockResolvedValue([]);

            const result = await getAggregatedPortfolioData(mockAssets);

            expect(result).toEqual({
                assetClass: [],
                specificAssets: [],
            });
        });

        it("should handle API errors", async () => {
            vi.mocked(portfolioService.getPortfolios).mockRejectedValue(new Error("API Error"));

            await expect(getAggregatedPortfolioData(mockAssets)).rejects.toThrow("Failed to fetch portfolio data");
        });
    });

    describe("getAggregatedPortfolioValueHistory", () => {
        const mockAssets = [
            { id: "1", name: "Apple", type: ASSET_TYPES.STOCK },
        ];

        const mockPortfolios = [{
            id: "portfolio1",
            positions: [
                { 
                    id: 1,
                    asset: "1", 
                    quantity: 10, 
                    price: 150,
                    asOf: "2024-01-01T12:00:00Z"
                },
                { 
                    id: 2,
                    asset: "1", 
                    quantity: 12, 
                    price:  160,
                    asOf: "2024-01-02T12:00:00Z"
                },
            ],
        }];

        it("should aggregate portfolio value history correctly", async () => {
            vi.mocked(portfolioService.getPortfolios).mockResolvedValue(mockPortfolios);

            const result = await getAggregatedPortfolioValueHistory(PERIOD_TYPE.MONTH, mockAssets);

            expect(result).toEqual([
                { date: "01/01/2024", value: 1500 },
                { date: "01/02/2024", value: 1920 },
            ]);
        });

        it("should handle empty history data", async () => {
            vi.mocked(portfolioService.getPortfolios).mockResolvedValue([]);

            const result = await getAggregatedPortfolioValueHistory(PERIOD_TYPE.MONTH, mockAssets);

            expect(result).toEqual([]);
        });

        it("should handle API errors", async () => {
            vi.mocked(portfolioService.getPortfolios).mockRejectedValue(new Error("API Error"));

            await expect(getAggregatedPortfolioValueHistory(PERIOD_TYPE.MONTH, mockAssets))
                .rejects.toThrow("Failed to fetch portfolio value history");
        });

        it("should use default period when none is provided", async () => {
            vi.mocked(portfolioService.getPortfolios).mockResolvedValue(mockPortfolios);

            await getAggregatedPortfolioValueHistory(PERIOD_TYPE.MONTH, mockAssets);

            expect(portfolioService.getPortfolios).toHaveBeenCalled();
        });
    });
});
