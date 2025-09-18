import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSIdebar";

function ProtectedRoute() {
  return (
    <div className="flex h-full w-full ">
      <AppSidebar />
      <Outlet />
    </div>
  );
}

export default ProtectedRoute;
