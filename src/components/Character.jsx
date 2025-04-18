import React from "react";
import { useParams } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect } from "react";

export const Character = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [characterData, setCharacterData] = useState(null);
  
  const { id } = useParams();
  const { store } = useGlobalReducer();

  const fetchCharacterData = async () => {
    try {
      setIsLoading(true);
      const cachedCharacter = store.characters.find(item => item.uid === id);
      
      const response = await fetch(`${API_URL}people/${id}`, {
        headers: { 'Accept': 'application/json' }
      });
      
      if (!response.ok) throw new Error('Character not found');
      
      const apiData = await response.json().then(data => data.result);
      
      const mergedData = {
        ...cachedCharacter,
        ...apiData,
        properties: {
          ...cachedCharacter?.properties,
          ...apiData.properties
        }
      };
      
      setCharacterData(mergedData);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacterData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <p className="text-light mt-2">Loading character data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mx-auto mt-4" style={{ maxWidth: '800px' }}>
        Error: {error}
      </div>
    );
  }

  if (!characterData) {
    return <div className="text-light text-center mt-4">Character not found</div>;
  }

  // Extraer datos
  const {
    name,
    description,
    properties: {
      height = 'N/A',
      mass = 'N/A',
      hair_color = 'N/A',
      skin_color = 'N/A',
      eye_color = 'N/A',
      birth_year = 'N/A',
      gender = 'N/A'
    } = {}
  } = characterData;

  return (
    <div className="card text-white bg-dark mb-4" style={{ 
      maxWidth: "1000px", 
      display: "flex", 
      flexDirection: "column", 
      margin: "auto",
      borderRadius: "0.5rem"
    }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <img 
          src={characterData.image || "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"} 
          alt={name}
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
          <h2 className="card-title text-uppercase" style={{ 
            fontSize: "1.5rem", 
            paddingBottom: "0.5rem",
            color: "rgb(158, 79, 96)"
          }}>
            {name}
          </h2>
          <p className="card-text mt-3" style={{ 
            fontSize: "1rem", 
            lineHeight: "1.6",
            color: "#ddd"
          }}>
            {description || 'No description available'}
          </p>
        </div>
      </div>

      {/* Sección de datos */}
      <div style={{ 
        borderTop: "2px solid rgb(158, 79, 96)", 
        padding: "1.5rem 1rem", 
        display: "flex", 
        justifyContent: "space-around", 
        flexWrap: "wrap", 
        color: "rgb(158, 79, 96)",
        textAlign: "center",
        backgroundColor: "#1a1a1a"
      }}>
        <div className="m-2">
          <strong>Name</strong><br />
          <span style={{ color: "#ddd" }}>{name}</span>
        </div>
        <div className="m-2">
          <strong>Birth Year</strong><br />
          <span style={{ color: "#ddd" }}>{birth_year}</span>
        </div>
        <div className="m-2">
          <strong>Gender</strong><br />
          <span style={{ color: "#ddd" }}>{gender}</span>
        </div>
        <div className="m-2">
          <strong>Height</strong><br />
          <span style={{ color: "#ddd" }}>{height} cm</span>
        </div>
        <div className="m-2">
          <strong>Mass</strong><br />
          <span style={{ color: "#ddd" }}>{mass} kg</span>
        </div>
        <div className="m-2">
          <strong>Hair Color</strong><br />
          <span style={{ color: "#ddd" }}>{hair_color}</span>
        </div>
        <div className="m-2">
          <strong>Skin Color</strong><br />
          <span style={{ color: "#ddd" }}>{skin_color}</span>
        </div>
        <div className="m-2">
          <strong>Eye Color</strong><br />
          <span style={{ color: "#ddd" }}>{eye_color}</span>
        </div>
      </div>
    </div>
  );
};