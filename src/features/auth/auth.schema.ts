import z from "zod"

export const loginFormSchema = z.object({
  email: z
    .email("Invalid email")
    .endsWith("@gmail.com", "Only Gmail addresses are allowed"),
  password: z.string().min(4, "This field is required"),
})

export const registrationFormSchema = z
  .object({
    email: z
      .email("Invalid email")
      .endsWith("@gmail.com", "Only Gmail addresses are allowed"),
    password: z.string().min(8, "Password must be more than 7 characters"),
    confirm_password: z.string("This field is required"),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  })

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>
export type LoginFormValues = z.infer<typeof loginFormSchema>
