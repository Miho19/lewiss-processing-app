import { Outlet } from "@tanstack/react-router";
import Navbar from "../component/Navbar/Navbar";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-r from-white via-[#eeeeee] to-white ">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
