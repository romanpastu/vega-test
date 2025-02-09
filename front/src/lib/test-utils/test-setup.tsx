import { render, cleanup } from '@testing-library/react'
import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import { rootRoute } from '@/router/root'
import { loginRouter } from '@/router/login/LoginRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { vi } from 'vitest'
import '@testing-library/jest-dom'
import { afterEach, beforeAll, beforeEach } from 'vitest'
import AuthLayout from '@/components/layouts/AuthLayout'
import Dashboard from '@/pages/dashboard/DashBoard'
import { portfolioTestData } from './dashboard/fixtures'

// Mock ResizeObserver for charts
class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

// Create test instances
const routeTree = rootRoute.addChildren([loginRouter])
export const testRouter = createRouter({ routeTree })
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
})

// Create auth layout test router
const authRootRoute = createRootRoute({
    component: AuthLayout
})

const dashboardRoute = createRoute({
    getParentRoute: () => authRootRoute,
    path: '/',
    component: Dashboard
})

const authRouteTree = authRootRoute.addChildren([dashboardRoute])

export const createAuthTestRouter = () => {
    const router = createRouter({
        routeTree: authRouteTree,
        defaultPreload: 'intent',
    })
    
    // Initialize router
    router.navigate({ to: '/' })
    return router
}

// Global test setup
beforeAll(() => {
    window.scrollTo = vi.fn()
    window.ResizeObserver = ResizeObserverMock

    // Mock the usePortfolioData hook for auth layout tests
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
})

// Setup before each test
beforeEach(() => {
    // Mock storage methods
    const storageMock = {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
        clear: vi.fn(),
        removeItem: vi.fn(),
        key: vi.fn(),
        length: 0
    }
    Object.defineProperty(window, 'localStorage', { value: storageMock })

    // Set up query mocks for auth layout tests
    queryClient.setQueryData(['portfolioData'], portfolioTestData.mockPortfolioData)
    queryClient.setQueryData(['portfolioValueHistory', '1M'], portfolioTestData.mockPortfolioHistory)
})

// Clean up after each test
afterEach(() => {
    cleanup()
    vi.clearAllMocks()
    queryClient.clear()
})

export const setupMocks = () => {
    window.scrollTo = vi.fn()
}

export const clearMocks = () => {
    vi.clearAllMocks()
    queryClient.clear()
}

type BaseRouter = typeof testRouter
type AuthRouter = ReturnType<typeof createAuthTestRouter>
type AppRouter = BaseRouter | AuthRouter

export const renderWithProviders = (router: AppRouter = testRouter) => {
    return render(
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <RouterProvider router={router} />
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export const renderWithAuthLayout = () => {
    const router = createAuthTestRouter()
    return {
        ...renderWithProviders(router),
        router
    }
} 