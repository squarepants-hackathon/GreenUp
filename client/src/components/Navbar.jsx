import { NavLink } from "react-router-dom";
import Auth from "./Auth";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  return (
    <div className="bg-[#1e1655] flex row p-4 items-center justify-center">
      <nav className="max-w-7xl mx-auto flex flex-row justify-between items-center w-full">
        <div></div>
        <div className="flex flex-row items-center justify-between px-2 text-[#F5F5F5] gap-3 md:text-xl sm:text-lg text-base">
          <NavLink to="/" className="cursor-pointer">
            Home
          </NavLink>
          <NavLink to="/inventory" className="cursor-pointer">
            Inventory
          </NavLink>
          <NavLink to="/dashboard" className="cursor-pointer">
            Dashboard
          </NavLink>
          <NavLink to="/contact-us" className="cursor-pointer">
            Contact
          </NavLink>
          <Auth />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
