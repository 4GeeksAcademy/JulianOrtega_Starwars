import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";

export const Characters = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          `${API_URL}people?page=1&limit=20`,
          { headers: { 'Accept': 'application/json' } }
        );
        const data = await response.json();
        dispatch({ 
          type: 'characters',
          payload: data.results
        });
      } catch (error) {
        console.error("Error fetching characters:", error);
        dispatch({ type: 'set_message', payload: "Error cargando personajes" });
      }
    };
    fetchCharacters();
  }, [dispatch]);

  return (
    <div className="d-flex flex-wrap gap-4 justify-content-center p-4">
      {store.characters?.map((character, index) => (
        <div 
          key={index}
          className="card bg-dark text-white" 
          style={{ 
            maxWidth: "200px", 
            height: "300px",
            flex: "1 1 200px"
          }}
        >
          <img 
            src={character.imageUrl || "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"} 
            className="card-img-top" 
            alt={character.name}
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
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <h5 className="card-title mb-1 text-uppercase" style={{ fontSize: "0.9rem" }}>
              {character.name}
            </h5>
            <a href="#" className="text-decoration-none text-danger small">
              Databank
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};