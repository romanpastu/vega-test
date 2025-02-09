import { clearMocks, setupMocks } from '@/lib/test-utils/test-setup'
import { screen } from '@testing-library/react'
import { renderDashboard } from '@/lib/test-utils/dashboard/helpers'

beforeAll(() => {
    setupMocks()
})

beforeEach(() => {
    setupMocks()
})

afterEach(() => {
    clearMocks()
})

describe('DashboardPage', () => {
    describe('Rendering', () => {
        it('should render the dashboard elements', async () => {
            renderDashboard()

            const portfolioChart = await screen.findByTestId('test-portfolio-chart')
            const portfolioTable = await screen.findByTestId('test-portfolio-table')
            const portfolioHistory = await screen.findByTestId('test-portfolio-history')

            expect(portfolioChart).toBeInTheDocument()
            expect(portfolioTable).toBeInTheDocument()
            expect(portfolioHistory).toBeInTheDocument()
        })
        
    })
})