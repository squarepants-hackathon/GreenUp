import { NavLink, useLocation } from "react-router-dom";
import Auth from "./Auth";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
    const location = useLocation();
    const path = location.pathname;

    const { isAuthenticated } = useAuth0();
    const navstyle = (path === '/dashboard') ? "#1e1655" : "inherit";
    const navColor = (path === '/dashboard') ? "white" : "inherit";
    return (
        <div className={`flex px-4 items-center justify-center`} style={{ "backgroundColor": navstyle }}>
            <nav className="max-w-7xl mx-auto flex md:flex-row flex-col justify-between items-center w-full">
                <div>
                    <img
                        src="/images/logo.png"
                        alt="logo"
                        className="w-[80px] h-[80px] scale-125"
                    />
                </div>
                <div className="flex sm:flex-row mt-2 sm:mt-0 flex-col items-center justify-center px-2 text-black font-medium gap-5 md:text-xl sm:text-lg text-base">
                    <div className="flex flex-row gap-4 sm:mt-0 mt-2" style={{ "color": navColor }}>
                        <NavLink to="/" className="cursor-pointer">
                            Home
                        </NavLink>
                        {isAuthenticated && (
                            <NavLink to="/inventory" className="cursor-pointer">
                                Inventory
                            </NavLink>
                        )}
                        {isAuthenticated && (
                            <NavLink to="/dashboard" className="cursor-pointer">
                                Dashboard
                            </NavLink>
                        )}
                        <NavLink to="/contact-us" className="cursor-pointer">
                            Contact
                        </NavLink>
                    </div>
                    <Auth />
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
