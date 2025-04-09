import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

export const Layout = () => {
  return (
    <ScrollToTop>
      <div className="d-flex flex-column vh-100 bg-dark">
        <Navbar />
        <div className="d-flex flex-grow-1">
          <Sidebar />
          <div className="flex-grow-1 overflow-auto">
            <div className="p-3">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </ScrollToTop>
  );
};
