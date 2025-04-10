import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

// Layout.jsx
export const Layout = () => {
  return (
    <ScrollToTop>
      <div className="d-flex flex-column bg-dark">
        <Navbar />
        <div className="d-flex">
          <Sidebar />
          <div 
            className="flex-grow-1 overflow-auto" 
            style={{ 
              marginLeft: "250px", // Ancho del sidebar
              marginTop: "60px",   // Altura del navbar
              height: "calc(100vh - 60px)", // Altura total menos navbar
              padding: "1.5rem"
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </ScrollToTop>
  );
};