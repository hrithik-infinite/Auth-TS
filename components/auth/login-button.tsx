"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}
export const LoginButton = ({ children, mode }: LoginButtonProps) => {
  const router = useRouter();

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Login Button Clicked");
    router.push("/auth/login");
  };
  if (mode === "modal") {
    return <span>TODO: Implement Modal</span>;
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
