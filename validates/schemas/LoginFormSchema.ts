import {z} from "zod";
import {api_t_keys} from "@/i18n";

export const LoginFormSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: api_t_keys.please_enter_a_valid_email })
    .max(255),
  password: z
    .string()
    .trim(),
})