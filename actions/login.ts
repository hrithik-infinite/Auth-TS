"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { send2faEmail, sendVerificationEmail } from "@/lib/mail";
import { generate2faToken, generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { email, password } = validateFields.data;
  const isExisiting = await getUserByEmail(email);
  if (!isExisiting || !isExisiting.email || !isExisiting.password) {
    return { error: "Email does not exist!" };
  }
  if (!isExisiting.emailVerified) {
    const verificationToken = await generateVerificationToken(isExisiting.email);
    await sendVerificationEmail("hrithikinfinite@gmail.com", verificationToken.token, isExisiting?.name ? isExisiting?.name : "");
    return { success: "Confirmation email sent" };
  }
  console.log({isE : isExisiting})
  if (isExisiting.isTwoFactorEnabled) {
    const _2faToken = await generate2faToken(isExisiting.email);
    console.log({_2faToken : _2faToken})

    // await send2faEmail(_2faToken.email, _2faToken.token, isExisiting.name);
    await send2faEmail("hrithikinfinite@gmail.com", _2faToken.token, isExisiting.name);

    return {twoFactor: true}
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    console.log(`Login Success for ${email}`);
    return { success: "Login Successful" };
  } catch (error) {
    console.log(`Error while signing in :${JSON.stringify(error)}`);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        case "AccessDenied":
          return { error: "Access Denied" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
