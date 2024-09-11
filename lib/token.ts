import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const isExsiting = await getVerificationTokenByEmail(email);
  if (isExsiting) {
    await db.verificationToken.delete({
      where: {
        id: isExsiting.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const isExsiting = await getPasswordResetTokenByEmail(email);
  if (isExsiting) {
    await db.passwordResetToken.delete({
      where: {
        id: isExsiting.id,
      },
    });
  }
  const resetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return resetToken;
};
