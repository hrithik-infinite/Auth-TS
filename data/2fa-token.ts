import { db } from "@/lib/db";

export const get2faTokenbyToken = async (token: string) => {
  try {
    const _2faToken = await db.twoFactorToken.findUnique({
      where: { token },
    });
    return _2faToken;
  } catch {
    return null;
  }
};

export const get2faTokenbyEmail = async (email: string) => {
  try {
    const _2faToken = await db.twoFactorToken.findFirst({
      where: { email },
    });
    return _2faToken;
  } catch {
    return null;
  }
};
