declare global {
    namespace API {
        export type Portfolio = {
            id: string;
            positions: Position[];
        }

        export type Position = {
            id: number;
            asset: string;
            quantity: number;
            asOf: string; 
            price: number;
        }
    }
}

export interface PortfolioData {
    assetClass: { name: string; value: number }[];
    specificAssets: { name: string; value: number }[];
}

export interface PortfolioHistoryDataPoint {
    date: string;
    value: number;
}

export type PortfolioValueHistory = PortfolioHistoryDataPoint[];

// Alias for the component props
export type AggregatedPortfolioData = PortfolioData;

// This is needed to make the file a module
export {};