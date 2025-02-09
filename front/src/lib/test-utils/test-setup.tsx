import { render, cleanup } from '@testing-library/react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { rootRoute } from '@/router/root'
import { loginRouter } from '@/router/login/LoginRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { vi } from 'vitest'
import '@testing-library/jest-dom'
import { afterEach, beforeAll, beforeEach } from 'vitest'

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

// Global test setup
beforeAll(() => {
    window.scrollTo = vi.fn()
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

export const renderWithProviders = () => {
    return render(
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <RouterProvider router={testRouter} />
            </ThemeProvider>
        </QueryClientProvider>
    )
} 