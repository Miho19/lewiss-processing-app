import { Outlet } from "@tanstack/react-router";
import Sidebar from "../component/sidebar/Sidebar";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full">
        <Sidebar />
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
