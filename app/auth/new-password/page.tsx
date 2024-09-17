import { NewPasswordForm } from "@/components/auth/new-password";
import React, { Suspense } from "react";

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordForm />
    </Suspense>
  );
};

export default NewPasswordPage;
