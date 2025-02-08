import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { LoginForm } from "./LoginForm"

export function LoginCard() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="space-y-2 p-8">
        <CardTitle className="text-4xl font-bold text-center">Get started</CardTitle>
        <CardDescription className="text-lg text-center">
          Sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <LoginForm />
      </CardContent>
    </Card>
  )
} 