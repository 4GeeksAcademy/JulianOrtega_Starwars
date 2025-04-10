import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";

export const Characters = ({ name, imageUrl }) => {

  const API_URL = import.meta.env.VITE_API_URL;
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchcharacters = async () => {
      try {
        const response = await fetch(
          `${API_URL}people?page=1&limit=20`,
          { headers: { 'Accept': 'application/json' } }
        );
        const data = await response.json();
        dispatch({ type: 'characters', payload: data });
      } catch (error) {
        console.error("Error fetching agendas:", error);
        dispatch({ type: 'set_message', payload: "Error cargando agendas" });
      }
    };
    fetchcharacters();
  }, [dispatch]);

  return (
    <div className="card bg-dark text-white" style={{ 
      maxWidth: "200px", 
      height: "300px"
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
