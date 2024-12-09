import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string({
      required_error: "Insira um e-mail.",
      message: "Insira um e-mail válido.",
    })
    .email({ message: "Insira um e-mail válido." })
    .trim(),
  password: z
    .string({
      required_error: "Insira sua senha.",
      message: "Insira uma senha.",
    })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type PFormState = {
  email?: string[];
  password?: string[];
};