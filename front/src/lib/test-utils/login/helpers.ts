import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export const fillLoginForm = async (username: string, password: string) => {
    const user = userEvent.setup()
    const usernameInput = await screen.findByTestId('username-input')
    const passwordInput = await screen.findByTestId('password-input')
    
    await user.type(usernameInput, username)
    await user.type(passwordInput, password)
    
    return user
}

export const submitLoginForm = async (user: ReturnType<typeof userEvent.setup>) => {
    const loginButton = await screen.findByTestId('login-button')
    await user.click(loginButton)
} 