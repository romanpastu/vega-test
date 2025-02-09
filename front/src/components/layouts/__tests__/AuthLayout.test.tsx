import { act, screen } from '@testing-library/react'
import { NAV_ITEMS } from "@/constants/navigation";
import userEvent from '@testing-library/user-event'
import { ANIMATION_DURATION } from '@/constants/animations';
import { renderWithAuthLayout } from '@/lib/test-utils/test-setup';

describe('AuthLayout', () => {
    it('renders the AuthLayout component', async () => {
        const { unmount } = renderWithAuthLayout()

        // Test that all defined nav items are present
        for (const item of NAV_ITEMS) {
            await screen.findByTestId(`test-${item.label.toLowerCase().replace(' ', '-')}`)
        }
        // Test that a random non-existent nav item is not present
        expect(screen.queryByTestId('some-random-nav')).not.toBeInTheDocument();

        unmount();
    })

    it('the logout button should be present', async () => {
        const { unmount } = renderWithAuthLayout()

        await screen.findByTestId('test-logout-button')

        unmount();
    })


    it('the logout button should redirect to the login page after cleaning the local storage', async () => {
        const { router } = renderWithAuthLayout();

        const logoutButton = await screen.findByTestId('test-logout-button');

        await act(async () => {
            await userEvent.click(logoutButton);
        });

        await act(async () => {
            // Wait for the animation to complete
            await new Promise(resolve => setTimeout(resolve, ANIMATION_DURATION.DEFAULT));
        });

        await act(async () => {
            expect(localStorage.getItem('jwt')).toBeNull();
            expect(router.state.location.pathname).toBe('/login');
        });
    })

    it("there should be a sidebar and the main dashboard should be rendered", async () => {
        const { unmount } = renderWithAuthLayout()

        await screen.findByTestId('test-dashboard-component')
        await screen.findByTestId('test-sidebar-component')

        unmount();
    })
})
