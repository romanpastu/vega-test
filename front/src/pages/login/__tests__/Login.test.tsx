import { act, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { LOGIN_PATH } from '@/constants/router'
import { authService } from '@/services/auth'
import { renderWithProviders, testRouter, setupMocks, clearMocks } from '@/lib/test-utils/test-setup'
import { loginTestData } from '@/lib/test-utils/login/fixtures'
import { fillLoginForm, submitLoginForm } from '@/lib/test-utils/login/helpers'

beforeAll(() => {
    setupMocks()
})

beforeEach(() => {
    setupMocks()
})

afterEach(() => {
    clearMocks()
})

describe('LoginPage', () => {
    describe('Rendering', () => {
        it('should render the login form elements', async () => {
            renderWithProviders()
            await act(async () => {
                await testRouter.navigate({ to: LOGIN_PATH })
            })

            const usernameInput = await screen.findByTestId('test-username-input')
            const passwordInput = await screen.findByTestId('test-password-input')
            const loginButton = await screen.findByTestId('test-login-button')

            expect(usernameInput).toBeInTheDocument()
            expect(passwordInput).toBeInTheDocument()
            expect(loginButton).toBeInTheDocument()
        })
    })

   describe('Authentication Flow', () => {
        it('should redirect to dashboard upon successful login', async () => {
            const mockLogin = vi.spyOn(authService, 'login')
            mockLogin.mockResolvedValue({ token: loginTestData.mockToken })
    
            renderWithProviders()
            await act(async () => {
                await testRouter.navigate({ to: LOGIN_PATH })
            })

            const user = await fillLoginForm(
                loginTestData.validUser.username, 
                loginTestData.validUser.password
            )
            await submitLoginForm(user)
    
            await waitFor(() => {
                expect(mockLogin).toHaveBeenCalledWith(loginTestData.validUser)
                expect(localStorage.setItem).toHaveBeenCalledWith('jwt', loginTestData.mockToken)
                expect(testRouter.state.location.pathname).toBe('/dashboard')
            })
        })

        it('should display error message on failed login', async () => {
            const mockLogin = vi.spyOn(authService, 'login')
            mockLogin.mockRejectedValue(new Error(loginTestData.errorMessage))
    
            renderWithProviders()
            await act(async () => {
                await testRouter.navigate({ to: LOGIN_PATH })
            })

            const user = await fillLoginForm(
                loginTestData.invalidUser.username, 
                loginTestData.invalidUser.password
            )
            await submitLoginForm(user)
    
            const errorMessage = await screen.findByTestId('test-login-error-message')
            expect(errorMessage).toBeInTheDocument()
        })
    })
})