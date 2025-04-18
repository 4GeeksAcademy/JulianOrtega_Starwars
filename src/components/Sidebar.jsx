import { Link } from "react-router-dom";
import React, { useState } from "react";

export const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  
  return (
    <div 
      className="d-flex flex-column p-3 text-white bg-dark"
      style={{
        position: "fixed",
        left: 0,
        top: "60px",
        bottom: 0,
        width: "250px",
        zIndex: 999,
        borderRight: "1px solid #333",
        overflowY: "auto"
      }}
    >
      <ul className="nav nav-pills flex-column mb-auto">
        {["Browse","All", "Characters", "planets", "Vehicles"].map((item, index) => (
          <li 
            className="nav-item" 
            key={index}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link 
              to={`${item.toLowerCase()}`}
              className={`${
                item === "Browse" 
                  ? "nav-link text-uppercase text-secondary" 
                  : `nav-link ${
                      index === hoveredItem ? "active" : "text-white"
                    }`
              }`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};