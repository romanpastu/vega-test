import { Label } from "@/components/ui/Label"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useLogin } from "@/pages/login/hooks/useLogin"

export function LoginForm() {
  const { formData, updateFormData, handleSubmit, loginMutation } = useLogin()

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="username" className="text-lg">Username</Label>
        <Input
          id="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={updateFormData('username')}
          required
          className="h-12 text-lg px-4"
          disabled={loginMutation.isPending}
        />
      </div>
      <div className="space-y-3">
        <Label htmlFor="password" className="text-lg">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={updateFormData('password')}
          required
          className="h-12 text-lg px-4"
          disabled={loginMutation.isPending}
        />
      </div>
      {loginMutation.isError && (
        <p className="text-red-500 text-center">
          Invalid username or password
        </p>
      )}
      <Button 
        type="submit" 
        className="w-full h-12 text-lg mt-6"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
      </Button>
      <p className="text-base text-center text-muted-foreground mt-6">
        By signing in, you agree to our{' '}
        <a href="#" className="text-primary hover:text-primary/90">
          Terms & Privacy Policy
        </a>
      </p>
    </form>
  )
} 