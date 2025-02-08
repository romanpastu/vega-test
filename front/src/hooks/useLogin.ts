import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

interface LoginFormData {
  username: string
  password: string
}

export function useLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  })

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
      
      if (!response.ok) {
        throw new Error('Login failed')
      }
      
      return response.json()
    },
    onSuccess: (data) => {
      localStorage.setItem('jwt', data.token)
      navigate({ to: '/dashboard' })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate(formData)
  }

  const updateFormData = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  return {
    formData,
    updateFormData,
    handleSubmit,
    loginMutation
  }
} 