import React from "react";
// import { FaTrash } from "react-icons/fa";

export const Navbar = () => {
  return (
    <div 
      className="bg-dark text-white border-secondary d-flex justify-content-between align-items-center px-4"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "60px",
        zIndex: 1000,
        borderTop: "4px solid rgb(158, 79, 96)",
        borderBottom: "1px solid #333"
      }}
    >
      <h1 className="m-0 text-uppercase small py-2">Browse Databank //</h1>

      <div className="dropdown">
        <button 
          className="btn btn-primary dropdown-toggle d-flex align-items-center gap-2"
          type="button" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          Favorites <span className="badge bg-secondary">2</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end bg-dark text-white p-2" style={{ minWidth: "200px" }}>
          <li className="d-flex justify-content-between align-items-center py-1">
            <span>Luke Skywalker</span>
            {/* <FaTrash className="text-danger" role="button" /> */}
          </li>
          <li className="d-flex justify-content-between align-items-center py-1">
            <span>Darth Vader</span>
            {/* <FaTrash className="text-danger" role="button" /> */}
          </li>
          <li><hr className="dropdown-divider bg-secondary" /></li>
          <li className="text-center text-muted small">Total: 2 items</li>
        </ul>
      </div>
    </div>
  );
};
