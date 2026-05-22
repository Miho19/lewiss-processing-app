import { Link, Outlet } from "@tanstack/react-router";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full p-3 flex items-center justify-between bg-white shadow-md">
        <div className="flex flex-1">LOGO</div>
        <div className="flex space-x-6">
          <Link
            to="/"
            className="[&.active]:font-semibold border-black/15 hover:shadow-xl hover:scale-105 rounded-lg py-3 px-12 flex justify-center items-center transition-all duration-100 ease-in-out"
          >
            <p className="">Home</p>
          </Link>
        </div>

        <div className="flex flex-1 justify-end">Notification</div>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
