import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { register } from "../api";

const Auth = () => {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("email", JSON.stringify(user.email));
            const registerUser = async () => {
                const value = {
                    email: user.email,
                };
                await register(value);
            };
            registerUser();
        }
    }, [user]);

    const LoginButton = () => (
        <button
            className="flex items-center justify-center px-4 py-2 border-2 bg-black font-medium text-white sm:text-sm cursor-pointer shadow-lg rounded-[5px]"
            onClick={() => loginWithRedirect()}
        >
            Log In
        </button>
    );

    const LogoutButton = () => (
        <button
            className="flex items-center justify-center px-4 py-2 border-2 bg-black font-medium text-white sm:text-sm cursor-pointer shadow-lg rounded-[5px]"
            onClick={() => logout({ returnTo: window.location.origin })}
        >
            Log Out
        </button>
    );

    return <>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</>;
};

export default Auth;
