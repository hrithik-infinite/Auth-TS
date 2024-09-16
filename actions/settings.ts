"use server";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { User } from "@prisma/client";
import * as z from "zod";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const session = await auth();

  const user = session?.user as User;
  if (!user) {
    return { error: "Unauthorized" };
  }
  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }
  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });
  return { success: "Settings Updated" };
};
