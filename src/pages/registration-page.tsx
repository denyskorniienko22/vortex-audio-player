import AuthLayout from "@/components/layouts/auth-layout"
import RegistrationForm from "@/features/auth/components/login-form"
import AuthFormContainer from "@/features/auth/components/ui/auth-form-container"
import { ROUTES } from "@/root/routes"

const RegistrationPage = () => {
  return (
    <AuthLayout>
      <AuthFormContainer
        title="Create an account"
        description="Enter your details below to register in the system"
        footerText="Already have an account?"
        footerLinkText="Sign In"
        footerLinkTo={ROUTES.LOGIN}
      >
        <RegistrationForm />
      </AuthFormContainer>
    </AuthLayout>
  )
}

export default RegistrationPage
