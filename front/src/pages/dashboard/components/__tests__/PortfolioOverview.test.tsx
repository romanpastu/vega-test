import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { queryClient } from '@/lib/test-utils/test-setup'
import { createPortfolioOverviewMocks, renderPortfolioOverview } from '@/lib/test-utils/dashboard/portfolio-overview'

beforeEach(() => {
    queryClient.clear();
});

describe('PortfolioOverview', () => {
    it('should handle view type changes correctly for both chart and table', async () => {
        const user = userEvent.setup();
        const { mockHandleChartViewTypeChange, mockHandleTableViewTypeChange } = createPortfolioOverviewMocks();
        
        renderPortfolioOverview({ 
            mockHandleChartViewTypeChange, 
            mockHandleTableViewTypeChange 
        });
        
        // Switch chart view type
        await user.click(screen.getByTestId('test-chart-view-toggle-specific'));
        expect(mockHandleChartViewTypeChange).toHaveBeenCalledWith('specific');

        // Switch table view type
        await user.click(screen.getByTestId('test-table-view-toggle-specific'));
        expect(mockHandleTableViewTypeChange).toHaveBeenCalledWith('specific');

        expect(mockHandleChartViewTypeChange).toHaveBeenCalledTimes(1);
        expect(mockHandleTableViewTypeChange).toHaveBeenCalledTimes(1);
    });
});