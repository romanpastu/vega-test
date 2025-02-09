import { useState } from 'react';
import { VIEW_TYPE } from './constants/portfolio';
import { ViewType, PeriodType } from './types';
import { usePortfolioData } from './hooks/usePortfolioData';
import { PortfolioOverview } from './components/PortfolioOverview';
import { PortfolioHistory } from './components/PortfolioHistory';

export default function Dashboard() {
    const [chartViewType, setChartViewType] = useState<ViewType>(VIEW_TYPE.CLASS);
    const [tableViewType, setTableViewType] = useState<ViewType>(VIEW_TYPE.CLASS);
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('1M');

    const {
        portfolioData,
        portfolioValueHistory,
        isLoading,
        isValueHistoryLoading,
        error,
        valueHistoryError,
        isFetching,
        isValueHistoryFetching,
        refetch
    } = usePortfolioData(selectedPeriod);

    const handleChartViewTypeChange = (type: ViewType) => {
        setChartViewType(type);
        refetch();
    };

    const handleTableViewTypeChange = (type: ViewType) => {
        setTableViewType(type);
        refetch();
    };

    return (
        <div className="box-border h-[calc(150vh)] lg:h-full p-4 flex flex-col lg:gap-4 gap-2 overflow-y-auto lg:overflow-visible">
            <PortfolioOverview
                data={portfolioData || { assetClass: [], specificAssets: [] }}
                isLoading={isLoading}
                isFetching={isFetching}
                error={error}
                chartViewType={chartViewType}
                tableViewType={tableViewType}
                onChartViewTypeChange={handleChartViewTypeChange}
                onTableViewTypeChange={handleTableViewTypeChange}
            />

            <PortfolioHistory
                data={portfolioValueHistory || []}
                isLoading={isValueHistoryLoading}
                isFetching={isValueHistoryFetching}
                error={valueHistoryError}
                selectedPeriod={selectedPeriod}
                onPeriodChange={setSelectedPeriod}
            />
        </div>
    );
}


