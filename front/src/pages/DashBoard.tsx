import { PortfolioChart } from '@/components/charts/PortfolioChart';
import { PortfolioHistoryChart } from '@/components/charts/PortfolioHistoryChart';
import { PortfolioTable } from '@/components/tables/PortfolioTable';

// Mock data
const PORTFOLIO_DATA = {
    assetClass: [
        { name: 'Stocks', value: 45000 },
        { name: 'Bonds', value: 25000 },
        { name: 'Real Estate', value: 15000 },
        { name: 'Cash', value: 10000 },
        { name: 'Crypto', value: 5000 },
    ],
    specificAssets: [
        { name: 'AAPL', value: 20000 },
        { name: 'GOOGL', value: 15000 },
        { name: 'VGSH', value: 12000 },
        { name: 'VNQ', value: 15000 },
        { name: 'USD', value: 10000 },
        { name: 'BTC', value: 3000 },
        { name: 'ETH', value: 2000 },
        { name: 'XRP', value: 1000 },
        { name: 'SOL', value: 500 },
        { name: 'ADA', value: 300 },
        { name: 'DOT', value: 200 },
        { name: 'LINK', value: 100 },
        { name: 'BTC', value: 3000 },
        { name: 'ETH', value: 2000 },
    ]
};

const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFA07A'];

// Mock historical data - last 12 months
const HISTORICAL_DATA = [
    { date: '2023-04', value: 85000 },
    { date: '2023-05', value: 87500 },
    { date: '2023-06', value: 89000 },
    { date: '2023-07', value: 92000 },
    { date: '2023-08', value: 88000 },
    { date: '2023-09', value: 91000 },
    { date: '2023-10', value: 93500 },
    { date: '2023-11', value: 96000 },
    { date: '2023-12', value: 98000 },
    { date: '2024-01', value: 97000 },
    { date: '2024-02', value: 99500 },
    { date: '2024-03', value: 100000 },
];
export default function Dashboard() {
    return (
        <div className="box-border h-full p-4 flex flex-col lg:gap-4 gap-10">
            {/* Top Section - Two Columns in Large, One Column in Mobile */}
            <div className="flex flex-col lg:flex-row gap-4 h-2/3 lg:h-1/2 min-h-[500px] ">
                {/* Portfolio Balance Chart */}
                <div className="bg-gray-100 rounded-lg p-6 flex-1 min-h-[250px] dark:bg-slate-800">
                    <PortfolioChart data={PORTFOLIO_DATA} colors={CHART_COLORS} />
                </div>

                {/* Portfolio Positions Table */}
                <div className="bg-gray-100 rounded-lg p-6 flex-1 min-h-[250px] dark:bg-slate-800">
                    <PortfolioTable data={PORTFOLIO_DATA} />
                </div>
            </div>

            {/* Bottom Section - Portfolio History */}
            <div className="bg-gray-100 rounded-lg p-6 h-1/3 lg:h-1/2 min-h-[300px] dark:bg-slate-800">
                <PortfolioHistoryChart data={HISTORICAL_DATA} />
            </div>
        </div>
    );
}


