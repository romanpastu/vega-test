import { render, screen } from '@testing-library/react'
import AuthLayout from './AuthLayout'

import { createRouter, RouterProvider, createRootRoute } from '@tanstack/react-router';

const rootRoute = createRootRoute({
    component: AuthLayout
})

const testRouter = createRouter({
    routeTree: rootRoute,
    defaultPreload: 'intent',
})

describe('AuthLayout', () => {
    it('renders the AuthLayout component', () => {
        render(
            <RouterProvider router={testRouter} />
        )
        expect(screen.getByText('Go to Dashboard')).toBeInTheDocument()
    })
})