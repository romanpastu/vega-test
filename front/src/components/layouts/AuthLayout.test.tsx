import { render, screen } from '@testing-library/react'
import AuthLayout from './AuthLayout'

import { createRouter, RouterProvider, createRootRoute } from '@tanstack/react-router';
import { NAV_ITEMS } from "@/constants/navigation";

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
        // Test that all defined nav items are present
        NAV_ITEMS.forEach(item => {
          expect(screen.getByTestId(item.label.toLowerCase().replace(' ', '-'))).toBeInTheDocument();
        });
        // Test that a random non-existent nav item is not present
        expect(screen.queryByTestId('some-random-nav')).not.toBeInTheDocument();
    })
})