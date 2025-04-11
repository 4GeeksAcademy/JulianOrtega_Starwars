import React from "react";
import { useParams } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect } from "react";


export const Character = () => {

  const API_URL = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  
  const { id } = useParams();

  const { store } = useGlobalReducer();
  const character = store.characters.find(item => item.uid === id);
  
  const fetchCharacter = async (page) => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}people/${id}`, {
        headers: { 'Accept': 'application/json' }
      });
      const data = await response.json();
      
      setDescription(data.result.description);
      
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      fetchCharacter();
    }, []);
  
  return (
    <div className="card text-white bg-dark mb-4" style={{ maxWidth: "1000px", display: "flex", flexDirection: "row", margin: "auto" }}>
      <img 
        src={"https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"} 
        alt={character.name}
        className="img-fluid "
        style={{ 
          width: "40%", 
          borderRight: "4px solid rgb(158, 79, 96)",
          objectFit: "cover",
          borderTopLeftRadius: "0.5rem", 
          borderBottomLeftRadius: "0.5rem" 
        }} 
      />
      <div 
        className="p-4 w-full" 
        style={{ 
          width: "60%", 
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
          {character.name}
        </h2>
        <p className="card-text mt-3" style={{ fontSize: "1rem", lineHeight: "1.6" }}>
          {description}
        </p>
      </div>
    </div>

  );
};