import React from "react";

export const Navbar = () => {
  return (
    <div 
      className="bg-dark text-white border-secondary py-2 px-4"
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
      <h1 className="m-0 py-2 text-uppercase small">Browse Databank //</h1>
    </div>
  );
};

// export default Navbar;
