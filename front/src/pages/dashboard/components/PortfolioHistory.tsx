import { PortfolioHistoryChart } from '@/components/charts/PortfolioHistoryChart';
import { LoadingContainer } from './LoadingContainer';
import { PeriodSelector } from './PeriodSelector';
import { PeriodType } from '../types';
import { PortfolioValueHistory } from '@/types/portfolio';

export type PortfolioHistoryProps = {
    data: PortfolioValueHistory;
    isLoading: boolean;
    isFetching: boolean;
    error: Error | null;
    selectedPeriod: PeriodType;
    onPeriodChange: (period: PeriodType) => void;
}

export function PortfolioHistory({
    data,
    isLoading,
    isFetching,
    error,
    selectedPeriod,
    onPeriodChange
}: PortfolioHistoryProps) {
    return (
        <div className="h-1/3 lg:h-1/2 min-h-[300px]">
            <LoadingContainer isLoading={isLoading} isFetching={isFetching} error={error}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Portfolio History</h2>
                    <PeriodSelector 
                        selectedPeriod={selectedPeriod}
                        onPeriodChange={onPeriodChange}
                    />
                </div>
                <PortfolioHistoryChart data={data} />
            </LoadingContainer>
        </div>
    );
} 