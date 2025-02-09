import { portfolioService } from "@/services/portfolio";
import { ASSET_TYPES } from "@/constants/assets";
import { getDateRangeFromPeriod } from "../utils/dashboard.utils";
import { PortfolioData, PortfolioValueHistory, PortfolioHistoryDataPoint } from "@/types/portfolio";
import { PeriodType } from "../types";
import { PERIOD_TYPE } from "../constants/portfolio";

export const getAggregatedPortfolioData = async (assets: API.Asset[]): Promise<PortfolioData> => {
    try {
        const portfolios = await portfolioService.getPortfolios();

        // Initialize asset class aggregates
        const assetClassAggregates = new Map<string, number>();
        const specificAssetAggregates = new Map<string, number>();

        // Ensure portfolios is an array and handle the data
        const portfolioArray = Array.isArray(portfolios) ? portfolios : [portfolios];

        // Process each portfolio
        portfolioArray.forEach((portfolio: API.Portfolio) => {
            if (!portfolio.positions) return;
            
            portfolio.positions.forEach((position: API.Position) => {
                const asset = assets.find(a => a.id === position.asset);
                if (!asset) return;

                const value = position.quantity * position.price;
                const assetClass = asset.type === ASSET_TYPES.STOCK ? 'Stocks' :
                                 asset.type === ASSET_TYPES.CRYPTO ? 'Crypto' : 'Cash';

                // Aggregate by asset class
                assetClassAggregates.set(
                    assetClass, 
                    (assetClassAggregates.get(assetClass) || 0) + value
                );

                // Aggregate by specific asset
                specificAssetAggregates.set(
                    asset.name,
                    (specificAssetAggregates.get(asset.name) || 0) + value
                );
            });
        });

        // Convert to required format
        const result: PortfolioData = {
            assetClass: Array.from(assetClassAggregates.entries()).map(([name, value]) => ({
                name,
                value
            })),
            specificAssets: Array.from(specificAssetAggregates.entries()).map(([name, value]) => ({
                name,
                value
            }))
        };

        return result;
    } catch (error) {
        console.error('Error aggregating portfolio data:', error);
        throw new Error('Failed to fetch portfolio data');
    }
};

export const getAggregatedPortfolioValueHistory = async (period: PeriodType = PERIOD_TYPE.MONTH, assets: API.Asset[]): Promise<PortfolioValueHistory> => {
    try {
        const dateRange = getDateRangeFromPeriod(period);
        const portfolios = await portfolioService.getPortfolios(dateRange);

        const portfolioArray = Array.isArray(portfolios) ? portfolios : [portfolios];
        const historyMap = new Map<string, number>();

        portfolioArray.forEach((portfolio: API.Portfolio) => {
            if (!portfolio.positions) return;

            portfolio.positions.forEach((position: API.Position) => {
                const asset = assets.find(a => a.id === position.asset);
                if (!asset) return;

                const positionDate = new Date(position.asOf);
                const date = positionDate.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit',
                    ...(period === PERIOD_TYPE.DAY && { hour: '2-digit', minute: '2-digit' })
                });

                historyMap.set(date, (historyMap.get(date) || 0) + position.quantity * position.price);
            });
        });

        // Convert map to array and sort by date
        const history: PortfolioHistoryDataPoint[] = Array.from(historyMap.entries())
            .map(([date, value]) => ({ date, value }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return history;
    } catch (error) {
        console.error('Error fetching portfolio value history:', error);
        throw new Error('Failed to fetch portfolio value history');
    }
};
