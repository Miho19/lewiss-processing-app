import { Outlet } from "@tanstack/react-router";
import Navbar from "../component/sidebar/Navbar";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
