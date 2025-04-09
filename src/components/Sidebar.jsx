import React, { useState } from "react";

export const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="d-flex flex-column p-3 text-white bg-dark" style={{ width: "250px", height: "100vh" }}>
      <ul className="nav nav-pills flex-column mb-auto">
        {["Browse","All", "Characters", "Creatures", "Droids", "Locations", "Organizations", "Species", "Vehicles", "Weapons+Tech", "More"].map((item, index) => (
          <li 
            className="nav-item" 
            key={index}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <a 
              href="#" 
              className={`${
                item === "Browse" 
                  ? "nav-link text-uppercase text-secondary" 
                  : `nav-link ${
                      index === hoveredItem ? "active" : "text-white"
                    }`
              }`}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};