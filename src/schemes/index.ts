import {z} from "zod";

export const SignupFormSchema = z.object({
  nickname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("Email must be at least 3 characters."),
  password: z.string().min(5),
  confirmPassword: z.string().min(5)
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
})

export type SignupFormState =
  | {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
  }
  message?: string
}
  | undefined