import { Link } from "@tanstack/react-router";
import lewissLogo from "../../asset/Lewis's White Text Logo.png";

function Navbar() {
  return (
    <header className="w-full h-16 fixed top-0 z-40   bg-white/20 backdrop-blur-md">
      <nav className="flex w-full h-full items-center justify-between shadow-md px-6 py-3">
        <h1 className="flex flex-1">
          <Link
            to="/"
            className="hover:scale-105 transition-all duration-100 ease-in-out"
          >
            <img
              src={lewissLogo}
              alt="Lewis's Home Fabrics"
              className="w-24 h-full invert"
            />
          </Link>
        </h1>
        <div className="flex space-x-6">
          <Link
            to="/"
            className="[&.active]:border-b border-white/50 pb-1 hover:scale-105 transition-all duration-100 ease-in-out"
          >
            <p className="">Home</p>
          </Link>
        </div>

        <div className="flex flex-1 justify-end"></div>
      </nav>
    </header>
  );
}

export default Navbar;

// bg-[#1a1a1a]
