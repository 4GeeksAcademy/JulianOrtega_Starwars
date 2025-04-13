import React from "react";
import { useParams } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect } from "react";

export const Vehicle = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  
  const { id } = useParams();
  const { store } = useGlobalReducer();

  const fetchVehicleData = async () => {
    try {
      setIsLoading(true);
      const cachedVehicle = store.vehicles.find(item => item.uid === id);
      
      const response = await fetch(`${API_URL}vehicles/${id}`, {
        headers: { 'Accept': 'application/json' }
      });
      
      if (!response.ok) throw new Error('Vehicle not found');
      
      const apiData = await response.json().then(data => data.result);
      
      const mergedData = {
        ...cachedVehicle,
        ...apiData,
        properties: {
          ...cachedVehicle?.properties,
          ...apiData.properties
        }
      };
      
      setVehicleData(mergedData);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <p className="text-light mt-2">Loading vehicle data...</p>
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

  if (!vehicleData) {
    return <div className="text-light text-center mt-4">Vehicle not found</div>;
  }

  // Extraer datos
  const {
    name,
    description,
    properties: {
      model = 'N/A',
      vehicle_class = 'N/A',
      manufacturer = 'N/A',
      cost_in_credits = 'N/A',
      length = 'N/A',
      crew = 'N/A',
      passengers = 'N/A',
      cargo_capacity = 'N/A',
      max_atmosphering_speed = 'N/A',
      consumables = 'N/A'
    } = {}
  } = vehicleData;

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
          src={vehicleData.imageUrl || "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"} 
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
            {description || 'No technical description available'}
          </p>
        </div>
      </div>

      {/* Sección de datos técnicos */}
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
          <strong>Model</strong><br />
          <span style={{ color: "#ddd" }}>{model}</span>
        </div>
        <div className="m-2">
          <strong>Class</strong><br />
          <span style={{ color: "#ddd" }}>{vehicle_class}</span>
        </div>
        <div className="m-2">
          <strong>Manufacturer</strong><br />
          <span style={{ color: "#ddd" }}>{manufacturer}</span>
        </div>
        <div className="m-2">
          <strong>Cost</strong><br />
          <span style={{ color: "#ddd" }}>{cost_in_credits} credits</span>
        </div>
        <div className="m-2">
          <strong>Length</strong><br />
          <span style={{ color: "#ddd" }}>{length}m</span>
        </div>
        <div className="m-2">
          <strong>Crew</strong><br />
          <span style={{ color: "#ddd" }}>{crew}</span>
        </div>
        <div className="m-2">
          <strong>Passengers</strong><br />
          <span style={{ color: "#ddd" }}>{passengers}</span>
        </div>
        <div className="m-2">
          <strong>Cargo Capacity</strong><br />
          <span style={{ color: "#ddd" }}>{cargo_capacity}kg</span>
        </div>
        <div className="m-2">
          <strong>Max Speed</strong><br />
          <span style={{ color: "#ddd" }}>{max_atmosphering_speed} km/h</span>
        </div>
        <div className="m-2">
          <strong>Consumables</strong><br />
          <span style={{ color: "#ddd" }}>{consumables}</span>
        </div>
      </div>
    </div>
  );
};