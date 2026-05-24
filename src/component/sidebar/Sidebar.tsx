import { Link } from "@tanstack/react-router";

function Sidebar() {
  return (
    <nav className="w-full flex items-center justify-between bg-white shadow-md px-6 py-3 h-16">
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
  );
}

export default Sidebar;
