"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { User, UserRole } from "@prisma/client";
import React from "react";
import { FormError } from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}
const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const session = useCurrentUser();
  const userData = session?.user as User;
  const role = userData?.role;
  if (role !== allowedRole) {
    return <FormError message="You do not have permission to view this content!" />;
  }
  return <>{children}</>;
};

export default RoleGate;
