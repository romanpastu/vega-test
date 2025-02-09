import { act, render, screen } from '@testing-library/react'
import { createRouter, RouterProvider, createRootRoute } from '@tanstack/react-router';
import { NAV_ITEMS } from "@/constants/navigation";
import AuthLayout from '../AuthLayout';
import userEvent from '@testing-library/user-event'
import { ANIMATION_DURATION } from '@/constants/animations';

const rootRoute = createRootRoute({
    component: AuthLayout
})

const testRouter = createRouter({
    routeTree: rootRoute,
    defaultPreload: 'intent',
})

describe('AuthLayout', () => {
    it('renders the AuthLayout component', async () => {
        const { unmount } = render(
            <RouterProvider router={testRouter} />
        )

        // Test that all defined nav items are present
        for (const item of NAV_ITEMS) {
            await screen.findByTestId(item.label.toLowerCase().replace(' ', '-'))
        }
        // Test that a random non-existent nav item is not present
        expect(screen.queryByTestId('some-random-nav')).not.toBeInTheDocument();

        unmount();
    })

    it('the logout button should be present', async () => {
        const { unmount } = render(
            <RouterProvider router={testRouter} />
        )

        await screen.findByTestId('logout-button')

        unmount();
    })

    it('the logout button should redirect to the login page after cleaning the local storage', async () => {
        await act(async () => {
            render(
                <RouterProvider router={testRouter} />
            );
        });

        const logoutButton = await screen.findByTestId('logout-button');

        await act(async () => {
            await userEvent.click(logoutButton);
        });

        await act(async () => {
            // Wait for the animation to complete
            await new Promise(resolve => setTimeout(resolve, ANIMATION_DURATION.DEFAULT));
        });

        await act(async () => {
            expect(localStorage.getItem('jwt')).toBeNull();
            expect(testRouter.state.location.pathname).toBe('/login');
        });
    })
})
