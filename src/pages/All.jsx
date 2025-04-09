import React from "react";

export const All = ({ name, imageUrl }) => {
  return (
    <div className="card bg-dark text-white" style={{ 
      maxWidth: "200px", 
      height: "300px" /* Altura total fija */
    }}>
      <img 
        src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" 
        className="card-img-top" 
        alt="alt"
        style={{ 
          height: "65%",
          objectFit: "cover", 
          width: "100%"
        }} 
      />
      <div 
        className="p-3"
        style={{ 
          height: "35%",
          borderTop: "4px solid rgb(158, 79, 96)",
          backgroundColor: "rgb(41, 40, 40)",
          backgroundImage: `
            repeating-linear-gradient(
              135deg,
              rgba(49, 48, 48, 0.8) 1px 4px,
              transparent 1px 10px
            )
          `,
          backgroundSize: "auto auto",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <h5 className="card-title mb-1 text-uppercase">Hola</h5>
        <a href="#" className="text-decoration-none text-danger small">Databank</a>
      </div>
    </div>
  );
};

// export default CharacterCard;
