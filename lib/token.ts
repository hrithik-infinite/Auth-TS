import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import crypto from "crypto";
import { get2faTokenbyEmail } from "@/data/2fa-token";

export const generatefaToken = async (email: string) => {
  const token = crypto.randomInt(100000, 1000000);
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const isExisting = await get2faTokenbyEmail(email);
  if (isExisting) {
    await db.twoFactorToken.delete({
      where: {
        id: isExisting.id,
      },
    });
  }
  const _2faToken = await db.twoFactorToken.create({
    data: {
      email,
      token: String(token),
      expires,
    },
  });
  return _2faToken;
};
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
