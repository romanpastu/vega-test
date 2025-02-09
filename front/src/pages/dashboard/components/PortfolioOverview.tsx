import { PortfolioChart } from '@/components/charts/PortfolioChart';
import { PortfolioTable } from '@/components/tables/PortfolioTable';
import { LoadingContainer } from './LoadingContainer';
import { ViewType } from '../types';
import { AggregatedPortfolioData } from '@/types/portfolio';

export type PortfolioOverviewProps = {
    data: AggregatedPortfolioData;
    isLoading: boolean;
    isFetching: boolean;
    error: Error | null;
    chartViewType: ViewType;
    tableViewType: ViewType;
    onChartViewTypeChange: (type: ViewType) => void;
    onTableViewTypeChange: (type: ViewType) => void;
}

const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFA07A'];

export function PortfolioOverview({
    data,
    isLoading,
    isFetching,
    error,
    chartViewType,
    tableViewType,
    onChartViewTypeChange,
    onTableViewTypeChange
}: PortfolioOverviewProps) {
    return (
        <div className="flex flex-col lg:flex-row lg:gap-4 gap-2 h-2/3 lg:h-1/2 min-h-[500px]">
            <div className="flex-1 min-h-[250px]">
                <LoadingContainer isLoading={isLoading} isFetching={isFetching} error={error}>
                    <PortfolioChart 
                        data={data} 
                        colors={CHART_COLORS}
                        viewType={chartViewType}
                        onViewTypeChange={onChartViewTypeChange}
                    />
                </LoadingContainer>
            </div>

            <div className="flex-1 min-h-[250px]">
                <LoadingContainer isLoading={isLoading} isFetching={isFetching} error={error}>
                    <PortfolioTable 
                        data={data} 
                        viewType={tableViewType}
                        onViewTypeChange={onTableViewTypeChange}
                    />
                </LoadingContainer>
            </div>
        </div>
    );
} 