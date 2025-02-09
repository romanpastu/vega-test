import { render } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import Dashboard from '@/pages/dashboard/DashBoard'
import { queryClient } from '../test-setup'
import { portfolioTestData } from './fixtures'
import { vi } from 'vitest'

// Mock the usePortfolioData hook
vi.mock('@/pages/dashboard/hooks/usePortfolioData', () => ({
    usePortfolioData: () => ({
        portfolioData: portfolioTestData.mockPortfolioData,
        portfolioValueHistory: portfolioTestData.mockPortfolioHistory,
        isLoading: false,
        isValueHistoryLoading: false,
        error: null,
        valueHistoryError: null,
        isFetching: false,
        isValueHistoryFetching: false,
        refetch: vi.fn()
    })
}))

export const renderDashboard = () => {
    // Set up query mocks
    queryClient.setQueryData(['portfolioData'], portfolioTestData.mockPortfolioData)
    queryClient.setQueryData(['portfolioValueHistory', '1M'], portfolioTestData.mockPortfolioHistory)
    
    return render(
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <Dashboard />
            </ThemeProvider>
        </QueryClientProvider>
    )
} 