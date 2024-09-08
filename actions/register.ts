"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { email, password, name } = validateFields.data;
  const hashedPswd = await bcrypt.hash(password, 10);
  const isExisiting = await getUserByEmail(email);
  if (isExisiting) {
    return { error: "Email already taken!" };
  }
  console.log({ name, email, password, hashedPswd });
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPswd,
    },
  });

  //TODO : Send Verification toekn Email
  return { success: "User Created!" };
};
