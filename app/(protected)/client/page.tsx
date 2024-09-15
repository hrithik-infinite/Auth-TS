"use client";
import { UserInfo } from "@/components/server/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { User } from "@prisma/client";

const ServerPage = () => {
  const session = useCurrentUser();
  const user = session?.user as User;
  return (
    <div>
      <UserInfo label="Client Component" user={user} />
    </div>
  );
};

export default ServerPage;
