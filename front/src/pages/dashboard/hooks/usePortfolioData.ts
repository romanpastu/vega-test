import { useQuery } from '@tanstack/react-query';
import { getAggregatedPortfolioData, getAggregatedPortfolioValueHistory } from '../services/dashboard.service';
import { PeriodType } from '../types';
import { portfolioService } from '@/services/portfolio';

export function usePortfolioData(selectedPeriod: PeriodType) {
    const { 
        data: assets,
        isLoading: isAssetsLoading 
    } = useQuery({
        queryKey: ['assets'],
        queryFn: portfolioService.getAssets,
    });

    const { 
        data: portfolioData, 
        isLoading: isPortfolioLoading, 
        error, 
        isFetching, 
        refetch 
    } = useQuery({
        queryKey: ['portfolioData', assets],
        queryFn: () => getAggregatedPortfolioData(assets || []),
        enabled: !!assets,
    });

    const { 
        data: portfolioValueHistory, 
        isLoading: isValueHistoryLoading, 
        error: valueHistoryError, 
        isFetching: isValueHistoryFetching 
    } = useQuery({
        queryKey: ['portfolioValueHistory', selectedPeriod, assets],
        queryFn: () => getAggregatedPortfolioValueHistory(selectedPeriod, assets || []),
        enabled: !!assets,
    });

    return {
        portfolioData,
        portfolioValueHistory,
        isLoading: isAssetsLoading || isPortfolioLoading,
        isValueHistoryLoading: isAssetsLoading || isValueHistoryLoading,
        error,
        valueHistoryError,
        isFetching,
        isValueHistoryFetching,
        refetch
    };
} 