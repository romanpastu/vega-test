import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { authService, type LoginCredentials } from '@/services/auth'
import { MAIN_PATH } from '@/constants/router'
import { ANIMATION_DURATION } from '@/constants/animations'

export function useLogin() {
  const navigate = useNavigate()
  const [isExiting, setIsExiting] = useState(false)
  const [formData, setFormData] = useState<LoginCredentials>({
    username: '',
    password: ''
  })

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: async (data) => {
      setIsExiting(true)
      // Wait for exit animation
      await new Promise(resolve => setTimeout(resolve, ANIMATION_DURATION.FAST))
      localStorage.setItem('jwt', data.token)
      navigate({ to: MAIN_PATH })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate(formData)
  }

  const updateFormData = (field: keyof LoginCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  return {
    formData,
    updateFormData,
    handleSubmit,
    loginMutation,
    isExiting
  }
} 