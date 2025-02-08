import { portfolioService } from "@/services/portfolio";
import { ASSET_TYPES } from "@/constants/assets";
import { getDateRangeFromPeriod } from "../utils/dashboard.utils";

interface PortfolioData {
    assetClass: { name: string; value: number }[];
    specificAssets: { name: string; value: number }[];
}
interface PortfolioValueHistory {
    date: string;
    value: number;
}

export type PeriodType = '1D' | '1W' | '1M' | '1Y';

export const getAggregatedPortfolioData = async (): Promise<PortfolioData> => {
    try {
        const portfolios = await portfolioService.getPortfolios();
        const assets = await portfolioService.getAssets();

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
                value: Math.round(value)
            })),
            specificAssets: Array.from(specificAssetAggregates.entries())
                .map(([name, value]) => ({
                    name,
                    value: Math.round(value)
                }))
                .sort((a, b) => b.value - a.value) // Sort by value descending
        };

        return result;
    } catch (error) {
        console.error('Error aggregating portfolio data:', error);
        throw new Error('Failed to fetch portfolio data');
    }
};

export const getAggregatedPortfolioValueHistory = async (period: PeriodType = '1M'): Promise<PortfolioValueHistory[]> => {
    try {
        const dateRange = getDateRangeFromPeriod(period);
        const portfolios = await portfolioService.getPortfolios(dateRange);
        const assets = await portfolioService.getAssets();

        const portfolioArray = Array.isArray(portfolios) ? portfolios : [portfolios];
        const historyMap = new Map<string, number>();

        portfolioArray.forEach((portfolio: API.Portfolio) => {
            if (!portfolio.positions) return;

            portfolio.positions.forEach((position: API.Position) => {
                const asset = assets.find(a => a.id === position.asset);
                if (!asset) return;

                const positionDate = new Date(position.asOf);
                const value = position.quantity * position.price;
                const date = positionDate.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit',
                    ...(period === '1D' && { hour: '2-digit', minute: '2-digit' })
                });

                // Aggregate values for the same date
                historyMap.set(date, (historyMap.get(date) || 0) + value);
            });
        });

        // Convert map to array and sort by date
        const history = Array.from(historyMap.entries()).map(([date, value]) => ({
            date,
            value: Math.round(value)
        }));

        return history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch (error) {
        console.error('Error aggregating portfolio value history:', error);
        throw new Error('Failed to fetch portfolio value history');
    }
};
