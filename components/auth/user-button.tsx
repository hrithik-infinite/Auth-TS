"use client";

import { FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";

const UserButton = () => {
  const user = useCurrentUser();
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    user.then((data) => {
      setUserData(data?.user as User);
    });
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={userData?.image || ""} />
          <AvatarFallback className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default UserButton;
