import { auth } from "@/auth";
import { UserInfo } from "@/components/server/user-info";
import { User } from "@prisma/client";

const ServerPage = async () => {
  const session = await auth();
  const user = session?.user as User;
  return (
    <div>
      <UserInfo label="Server Component" user={user} />
    </div>
  );
};

export default ServerPage;
