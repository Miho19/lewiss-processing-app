import { Link } from "@tanstack/react-router";

function Navbar() {
  return (
    <header className="w-full h-16 fixed top-0 z-40">
      <nav className="flex w-full h-full items-center justify-between bg-white shadow-md px-6 py-3">
        <div className="flex flex-1">LOGO</div>
        <div className="flex space-x-6">
          <Link
            to="/"
            className="[&.active]:border-b border-black/15 pb-1 hover:scale-105 transition-all duration-100 ease-in-out"
          >
            <p className="">Home</p>
          </Link>
        </div>

        <div className="flex flex-1 justify-end">Notification</div>
      </nav>
    </header>
  );
}

export default Navbar;
