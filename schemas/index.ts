import { UserRole } from "@prisma/client";
import * as z from "zod";
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters are required",
  }),
  name: z.string().min(1, {
    message: "Name is Required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({}),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters are required",
  }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    is2faEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      return !data.password || data.newPassword;
    },
    {
      message: "New password is required when changing the password.",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      return !data.newPassword || data.password;
    },
    {
      message: "Current password is required to set a new password.",
      path: ["password"],
    }
  );
