"use server";
import { auth } from "@/auth";
import { getUserByEmail, getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generate2faToken } from "@/lib/token";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const session = await auth();

  const user = session?.user;
  if (!user) {
    return { error: "Unauthorized" };
  }
  const dbUser = await getUserById(user?.id ? user.id : "");
  if (!dbUser) {
    return { error: "Unauthorized" };
  }
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.is2faEnabled = undefined;
  }
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" };
    }

    const verifToken = await generate2faToken(values.email);
    await sendVerificationEmail(verifToken.email, verifToken.token, existingUser?.name ? existingUser?.name : "");
    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(values.password, dbUser.password);
    if (!passwordMatch) {
      return { error: "Incorrect password" };
    }
    const hashedPwd = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPwd;
    values.newPassword = undefined;
  }
  await db.user.update({
    where: { id: dbUser.id },
    data: {
      role: values.role,
      email: values?.email,
      isTwoFactorEnabled: values?.is2faEnabled,
      name: values?.name,
      password: values?.password,
    },
  });
  return { success: "Settings Updated" };
};
