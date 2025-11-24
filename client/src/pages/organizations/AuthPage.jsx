import React, { useState } from "react";
import SignIn from "../../components/SignIn";

const AuthPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <div className="min-h-screen bg-secondary-100">
        <div className="min-h-[calc(100vh-10vh)] flex items-center justify-center px-4">
          <SignIn />
        </div>
      </div>
    </>
  );
};

export default AuthPage;
