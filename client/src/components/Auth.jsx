import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { register } from "../api";

const Auth = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("email", JSON.stringify(user.email));
      const registerUser = async () => {
        const value = {
          email: user.email,
        };
        const { data } = await register(value);
      };
      registerUser();
    }
  }, [user]);

  const LoginButton = () => (
    <button
      className="flex items-center justify-center sm:w-24 py-2 border-2 bg-inherit hover:bg-opacity-50 font-medium text-white sm:text-sm text-xl cursor-pointer shadow-lg rounded-[5px] w-full"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );

  const LogoutButton = () => (
    <button
      className="flex items-center justify-center sm:w-24 py-2 border-2 bg-black font-medium text-white sm:text-sm text-xl cursor-pointer shadow-lg rounded-[5px] w-full"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </button>
  );

  return <>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</>;
};

export default Auth;
