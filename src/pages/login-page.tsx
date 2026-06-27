import AuthLayout from "@/components/layouts/auth-layout"
import LoginForm from "@/features/auth/components/login-form"
import AuthFormContainer from "@/features/auth/components/ui/auth-form-container"
import { ROUTES } from "@/root/routes"

const LoginPage = () => {
  return (
    <AuthLayout>
      <AuthFormContainer
        title="Sign In to your account"
        description="Enter your details below to sign in into the system"
        footerText="Don't have an account?"
        footerLinkText="Sign Up"
        footerLinkTo={ROUTES.REGISTRATION}
      >
        <LoginForm />
      </AuthFormContainer>
    </AuthLayout>
  )
}

export default LoginPage
