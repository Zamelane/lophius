import { api_t_keys } from '@/i18n'
import { z } from 'zod'

export const LoginFormSchema = z.object({
  password: z.string().trim(),
  email: z
    .string()
    .trim()
    .email({ message: api_t_keys.please_enter_a_valid_email })
    .max(255)
})
