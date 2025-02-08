import { PortfolioChart } from '@/components/charts/PortfolioChart';
import { PortfolioHistoryChart } from '@/components/charts/PortfolioHistoryChart';
import { PortfolioTable } from '@/components/tables/PortfolioTable';
import { getAggregatedPortfolioData } from './services/dashboard.service';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { VIEW_TYPE } from './constants/portfolio';

export type ViewType = typeof VIEW_TYPE.CLASS | typeof VIEW_TYPE.SPECIFIC;
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
    const [chartViewType, setChartViewType] = useState<ViewType>(VIEW_TYPE.CLASS);
    const [tableViewType, setTableViewType] = useState<ViewType>(VIEW_TYPE.CLASS);

    const { data: portfolioData, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: ['portfolioData'],
        queryFn: getAggregatedPortfolioData,
    });

    const handleChartViewTypeChange = (type: ViewType) => {
        setChartViewType(type);
        refetch(); 
    };

    const handleTableViewTypeChange = (type: ViewType) => {
        setTableViewType(type);
        refetch(); 
    };

    const ErrorState = () => (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-destructive">
            <AlertCircle size={48} />
            <p className="text-lg font-medium">Failed to load portfolio data</p>
        </div>
    );

    return (
        <div className="box-border h-full p-4 flex flex-col lg:gap-4 gap-10">
            {/* Top Section - Two Columns in Large, One Column in Mobile */}
            <div className="flex flex-col lg:flex-row gap-4 h-2/3 lg:h-1/2 min-h-[500px]">
                {/* Portfolio Balance Chart */}
                <div 
                    className={cn(
                        "rounded-lg p-6 flex-1 min-h-[250px]",
                        (isLoading || isFetching)
                            ? "animate-pulse bg-accent/80" 
                            : "bg-[var(--chart-container-bg)]"
                    )}
                >
                    {error ? (
                        <ErrorState />
                    ) : portfolioData && !isFetching ? (
                        <PortfolioChart 
                            data={portfolioData} 
                            colors={CHART_COLORS}
                            viewType={chartViewType}
                            onViewTypeChange={handleChartViewTypeChange}
                        />
                    ) : null}
                </div>

                {/* Portfolio Positions Table */}
                <div 
                    className={cn(
                        "rounded-lg p-6 flex-1 min-h-[250px]",
                        (isLoading || isFetching)
                            ? "animate-pulse bg-accent/80" 
                            : "bg-[var(--chart-container-bg)]"
                    )}
                >
                    {error ? (
                        <ErrorState />
                    ) : portfolioData && !isFetching ? (
                        <PortfolioTable 
                            data={portfolioData} 
                            viewType={tableViewType}
                            onViewTypeChange={handleTableViewTypeChange}
                        />
                    ) : null}
                </div>
            </div>

            {/* Bottom Section - Portfolio History */}
            <div className="bg-[var(--chart-container-bg)] rounded-lg p-6 h-1/3 lg:h-1/2 min-h-[300px]">
                <PortfolioHistoryChart data={HISTORICAL_DATA} />
            </div>
        </div>
    );
}


