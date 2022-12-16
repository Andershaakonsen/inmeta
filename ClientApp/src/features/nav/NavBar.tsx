import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="w-full border-t border-radix-slate3 h-14 text-xl flex items-center fixed bottom-0 z-10">
      <ul className="flex w-full justify-around">
        <Link
          to="/"
          className="text-radix-slate11 hover:text-radix-blue11 hover:scale-110 transition-all"
        >
          Home
        </Link>
        <Link
          to="/customers"
          className="text-radix-slate11 hover:text-radix-blue11 hover:scale-110 transition-all"
        >
          Customers
        </Link>
        <Link
          to="/orders"
          className="text-radix-slate11 hover:text-radix-blue11 hover:scale-110 transition-all"
        >
          Orders
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
