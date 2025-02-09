import { render } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { PortfolioOverview } from '@/pages/dashboard/components/PortfolioOverview'
import { VIEW_TYPE } from '@/pages/dashboard/constants/portfolio'
import { queryClient } from '../test-setup'
import { portfolioTestData } from './fixtures'
import { vi } from 'vitest'

type ViewTypeChangeHandler = (type: 'class' | 'specific') => void;

export const createPortfolioOverviewMocks = () => {
    const mockHandleChartViewTypeChange = vi.fn<ViewTypeChangeHandler>();
    const mockHandleTableViewTypeChange = vi.fn<ViewTypeChangeHandler>();

    return {
        mockHandleChartViewTypeChange,
        mockHandleTableViewTypeChange
    };
};

interface RenderPortfolioOverviewProps {
    mockHandleChartViewTypeChange: ViewTypeChangeHandler;
    mockHandleTableViewTypeChange: ViewTypeChangeHandler;
    data?: typeof portfolioTestData.mockPortfolioData;
    chartViewType?: typeof VIEW_TYPE.CLASS | typeof VIEW_TYPE.SPECIFIC;
    tableViewType?: typeof VIEW_TYPE.CLASS | typeof VIEW_TYPE.SPECIFIC;
    isLoading?: boolean;
    isFetching?: boolean;
    error?: Error | null;
}

export const renderPortfolioOverview = ({
    mockHandleChartViewTypeChange,
    mockHandleTableViewTypeChange,
    data = portfolioTestData.mockPortfolioData,
    chartViewType = VIEW_TYPE.CLASS,
    tableViewType = VIEW_TYPE.CLASS,
    isLoading = false,
    isFetching = false,
    error = null
}: RenderPortfolioOverviewProps) => {
    return render(
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <PortfolioOverview
                    data={data}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    error={error}
                    chartViewType={chartViewType}
                    tableViewType={tableViewType}
                    onChartViewTypeChange={mockHandleChartViewTypeChange}
                    onTableViewTypeChange={mockHandleTableViewTypeChange}
                />
            </ThemeProvider>
        </QueryClientProvider>
    );
}; 