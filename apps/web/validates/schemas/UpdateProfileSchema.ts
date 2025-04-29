import { api_t_keys } from '@/i18n'
import { z } from 'zod'

export const UpdateProfileSchema = z.object({
  avatarId: z.number().nullable(),
  backgroundId: z.number().nullable(),
  nickname: z.string().trim().max(15),
  bio: z.string().trim().max(180).nullable(),
  email: z
    .string()
    .trim()
    .email({ message: api_t_keys.please_enter_a_valid_email })
    .max(255)
})
