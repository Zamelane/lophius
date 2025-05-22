import { api_t_keys } from '@/src/shared/i18n'
import { z } from 'zod'
import { CheckNicknameExists } from '../validators/checkNicknameExists';
import { CheckEmailExists } from '../validators/checkEmailExists';

export const SignupFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: api_t_keys.please_enter_a_valid_email })
    .max(255)
    .refine(CheckEmailExists, api_t_keys.use_by_a_different_user),
  nickname: z
    .string()
    .trim()
    .min(2, { message: api_t_keys.nickname_must_be_at_least_2_characters_long })
    .refine(CheckNicknameExists, api_t_keys.use_by_a_different_user),
  password: z
    .string()
    .trim()
    .min(8, { message: api_t_keys.password_at_least_8_characters })
    .regex(/[a-z]/, { message: api_t_keys.password_at_least_1_lowercase })
    .regex(/[A-Z]/, { message: api_t_keys.password_at_least_1_uppercase })
    .regex(/[0-9]/, { message: api_t_keys.password_at_least_1_number })
})
