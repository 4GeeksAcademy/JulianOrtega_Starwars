import React from "react";
import { useParams } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect } from "react";

export const Planeta = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [planetData, setPlanetData] = useState(null);
  
  const { id } = useParams();
  const { store } = useGlobalReducer();

  const fetchPlanetData = async () => {
    try {
      setIsLoading(true);
      const cachedPlanet = store.planets.find(item => item.uid === id);
      
      const response = await fetch(`${API_URL}planets/${id}`, {
        headers: { 'Accept': 'application/json' }
      });
      
      if (!response.ok) throw new Error('Planet not found');
      
      const apiData = await response.json().then(data => data.result);
      
      const mergedData = {
        ...cachedPlanet,
        ...apiData,
        properties: {
          ...cachedPlanet?.properties,
          ...apiData.properties
        }
      };
      
      setPlanetData(mergedData);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanetData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <p className="text-light mt-2">Loading planet data...</p>
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

  if (!planetData) {
    return <div className="text-light text-center mt-4">Planet not found</div>;
  }

  // Extraer datos
  const {
    name,
    description,
    properties: {
      climate = 'N/A',
      diameter = 'N/A',
      gravity = 'N/A',
      orbital_period = 'N/A',
      population = 'N/A',
      rotation_period = 'N/A',
      surface_water = 'N/A',
      terrain = 'N/A'
    } = {}
  } = planetData;
  console.log(planetData);
  

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
          src={planetData.imageUrl || "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"} 
          alt={planetData.properties.name}
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
            {planetData.properties.name}
          </h2>
          <p className="card-text mt-3" style={{ 
            fontSize: "1rem", 
            lineHeight: "1.6",
            color: "#ddd"
          }}>
            {description || 'No planetary description available'}
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
          <strong>Climate</strong><br />
          <span style={{ color: "#ddd" }}>{climate}</span>
        </div>
        <div className="m-2">
          <strong>Diameter</strong><br />
          <span style={{ color: "#ddd" }}>{diameter} km</span>
        </div>
        <div className="m-2">
          <strong>Gravity</strong><br />
          <span style={{ color: "#ddd" }}>{gravity}</span>
        </div>
        <div className="m-2">
          <strong>Orbital Period</strong><br />
          <span style={{ color: "#ddd" }}>{orbital_period} days</span>
        </div>
        <div className="m-2">
          <strong>Population</strong><br />
          <span style={{ color: "#ddd" }}>{population}</span>
        </div>
        <div className="m-2">
          <strong>Rotation Period</strong><br />
          <span style={{ color: "#ddd" }}>{rotation_period} hours</span>
        </div>
        <div className="m-2">
          <strong>Surface Water</strong><br />
          <span style={{ color: "#ddd" }}>{surface_water}%</span>
        </div>
        <div className="m-2">
          <strong>Terrain</strong><br />
          <span style={{ color: "#ddd" }}>{terrain}</span>
        </div>
      </div>
    </div>
  );
};