import { useQuery } from '@tanstack/react-query';
import { getAggregatedPortfolioData, getAggregatedPortfolioValueHistory } from '../services/dashboard.service';
import { PeriodType } from '../types';

export function usePortfolioData(selectedPeriod: PeriodType) {
    const { 
        data: portfolioData, 
        isLoading, 
        error, 
        isFetching, 
        refetch 
    } = useQuery({
        queryKey: ['portfolioData'],
        queryFn: getAggregatedPortfolioData,
    });

    const { 
        data: portfolioValueHistory, 
        isLoading: isValueHistoryLoading, 
        error: valueHistoryError, 
        isFetching: isValueHistoryFetching 
    } = useQuery({
        queryKey: ['portfolioValueHistory', selectedPeriod],
        queryFn: () => getAggregatedPortfolioValueHistory(selectedPeriod),
    });

    return {
        portfolioData,
        portfolioValueHistory,
        isLoading,
        isValueHistoryLoading,
        error,
        valueHistoryError,
        isFetching,
        isValueHistoryFetching,
        refetch
    };
} 