import { db } from "@/lib/db";

export const get2faConfmByUserId = async (userId: string) => {
  try {
    const _2faconf = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });
    return _2faconf;
  } catch {
    return null;
  }
};
