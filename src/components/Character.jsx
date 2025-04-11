import React from "react";
import { useParams } from 'react-router-dom';


export const Character = () => {
  
  const { id } = useParams();
  
  return (
    <div className="card text-white bg-dark mb-4" style={{ maxWidth: "1000px", display: "flex", flexDirection: "row", margin: "auto" }}>
      <img 
        src={"https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"} 
        alt="sfdg"
        className="img-fluid"
        style={{ 
          width: "40%", 
          borderRight: "4px solid rgb(158, 79, 96)",
          objectFit: "cover",
          borderTopLeftRadius: "0.5rem", 
          borderBottomLeftRadius: "0.5rem" 
        }} 
      />
      <div 
        className="p-4" 
        style={{ 
          backgroundColor: "#1f1f1f",
          backgroundImage: `
            repeating-linear-gradient(
              135deg,
              rgba(49, 48, 48, 0.8) 1px 4px,
              transparent 1px 10px
            )
          `
        }}
      >
        <h2 className="card-title text-uppercase" style={{ fontSize: "1.5rem", paddingBottom: "0.5rem" }}>
          dgjfhh
        </h2>
        <p className="card-text mt-3" style={{ fontSize: "1rem", lineHeight: "1.6" }}>
          Luke Skywalker was a Tatooine farmboy who rose from humble beginnings to become one of the greatest Jedi the galaxy has ever known...
        </p>
      </div>
    </div>

  );
};