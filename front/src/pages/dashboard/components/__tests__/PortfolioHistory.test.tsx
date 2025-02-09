import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { queryClient } from '@/lib/test-utils/test-setup'
import { vi } from 'vitest'
import { PortfolioHistory } from '../PortfolioHistory'
import { render } from '@testing-library/react'
import { PERIODS, PERIOD_TYPE } from '../../constants/portfolio'

beforeEach(() => {
    queryClient.clear();
});

describe('PortfolioHistory', () => {
    it('The portfolio history timeline selectors should properly send the query params', async () => {
        const user = userEvent.setup();
        const mockOnPeriodChange = vi.fn();
        
        render(
            <PortfolioHistory
                data={[]}
                isLoading={false}
                isFetching={false}
                error={null}
                selectedPeriod={PERIOD_TYPE.MONTH}
                onPeriodChange={mockOnPeriodChange}
            />
        );

        // Click on each period option and verify the callback is called
        for (const period of PERIODS) {
            await user.click(screen.getByTestId(`test-period-selector-${period.toLowerCase()}`));
            expect(mockOnPeriodChange).toHaveBeenCalledWith(period);
        }

        expect(mockOnPeriodChange).toHaveBeenCalledTimes(PERIODS.length);
    });
});