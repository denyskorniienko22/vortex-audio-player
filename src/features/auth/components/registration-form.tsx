import { Eye, EyeClosed, Lock, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ROUTES } from "@/root/routes"

import { AUTH_INTENTS } from "../auth.constants"
import { registrationFormSchema } from "../auth.schema"
import { useAuthForm } from "../hooks/use-auth-form"
import { AuthForm,AuthFormField, AuthFormInput } from "./ui"

const RegistrationForm = () => {
  const {
    isPasswordView,
    isSubmitting,
    handleTogglePasswordView,
    register,
    formState: { isValid, errors },
  } = useAuthForm({
    intent: AUTH_INTENTS.REGISTRATION,
    schema: registrationFormSchema,
  })

  return (
    <AuthForm
      action={ROUTES.REGISTRATION}
      btnText="Sign Up"
      intent={AUTH_INTENTS.REGISTRATION}
      isValid={isValid}
      isSubmitting={isSubmitting}
    >
      <AuthFormField id="email" errors={errors} label="Email" icon={Mail}>
        <AuthFormInput
          id="email"
          type="email"
          register={register}
          placeholder="example@gmail.com"
        />
      </AuthFormField>

      <AuthFormField id="password" errors={errors} label="Password" icon={Lock}>
        <AuthFormInput
          id="password"
          type={isPasswordView ? "text" : "password"}
          register={register}
          placeholder="••••••••"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleTogglePasswordView}
          >
            {isPasswordView ? <Eye /> : <EyeClosed />}
          </Button>
        </div>
      </AuthFormField>

      <AuthFormField
        id="confirm_password"
        errors={errors}
        label="Confirm password"
        icon={Lock}
      >
        <AuthFormInput
          id="confirm_password"
          type={isPasswordView ? "text" : "password"}
          register={register}
          placeholder="••••••••"
        />
      </AuthFormField>
    </AuthForm>
  )
}

export default RegistrationForm
