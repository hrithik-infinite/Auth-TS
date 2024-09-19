"use server";
import { getUserByEmail } from "@/data/user";
import { sendResetLinkEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { ResetSchema } from "@/schemas";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }
  const { email } = validatedFields.data;
  const exitingUser = await getUserByEmail(email);
  if (!exitingUser) {
    return { error: "Email not found!" };
  }
  const token = await generatePasswordResetToken(email);
  await sendResetLinkEmail(token.email, token.token, exitingUser?.name);
  return { success: "Reset email sent!" };
};
