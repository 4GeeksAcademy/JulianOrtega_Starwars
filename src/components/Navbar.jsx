import React from "react";
import { FaTrash } from "react-icons/fa";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const { store } = useGlobalReducer();
  const [likedCharactersUids, setLikedCharactersUids] = useState([]);
  const [likedVehiclesUids, setLikedVehiclesUids] = useState([]);
  const [likedPlanetsUids, setLikedPlanetsUids] = useState([]);
  
  useEffect(() => {
    const loadLikedItems = () => {
      const savedCharacters = localStorage.getItem('likedCharacters');
      const savedVehicles = localStorage.getItem('likedVehicles');
      const savedPlanets = localStorage.getItem('likedPlanets');
      
      if (savedCharacters) setLikedCharactersUids(JSON.parse(savedCharacters));
      if (savedVehicles) setLikedVehiclesUids(JSON.parse(savedVehicles));
      if (savedPlanets) setLikedPlanetsUids(JSON.parse(savedPlanets));
    };
    
    loadLikedItems();

    const handleStorageChange = (e) => {
      if (['likedCharacters', 'likedVehicles', 'likedPlanets'].includes(e.key)) {
        loadLikedItems();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(loadLikedItems, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const likedCharacters = store.characters?.filter(character => 
    likedCharactersUids.includes(character.uid)
  ) || [];

  const likedVehicles = store.vehicles?.filter(vehicle => 
    likedVehiclesUids.includes(vehicle.uid)
  ) || [];

  const likedPlanets = store.planets?.filter(planet => 
    likedPlanetsUids.includes(planet.uid)
  ) || [];

  const combinedLiked = [
    ...likedCharacters.map(c => ({ ...c, type: 'character' })),
    ...likedVehicles.map(v => ({ ...v, type: 'vehicle' })),
    ...likedPlanets.map(p => ({ ...p, type: 'planet' }))
  ];

  const handleDelete = (uid, type) => {
    let newLiked;
    switch(type) {
      case 'character':
        newLiked = likedCharactersUids.filter(id => id !== uid);
        setLikedCharactersUids(newLiked);
        localStorage.setItem('likedCharacters', JSON.stringify(newLiked));
        break;
      case 'vehicle':
        newLiked = likedVehiclesUids.filter(id => id !== uid);
        setLikedVehiclesUids(newLiked);
        localStorage.setItem('likedVehicles', JSON.stringify(newLiked));
        break;
      case 'planet':
        newLiked = likedPlanetsUids.filter(id => id !== uid);
        setLikedPlanetsUids(newLiked);
        localStorage.setItem('likedPlanets', JSON.stringify(newLiked));
        break;
      default:
        break;
    }
  };
  
  return (
    <div 
      className="bg-dark text-white border-secondary d-flex justify-content-between align-items-center px-4"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "60px",
        zIndex: 1000,
        borderTop: "4px solid rgb(158, 79, 96)",
        borderBottom: "1px solid #333"
      }}
    >
      <h1 className="m-0 text-uppercase small py-2">Browse Databank //</h1>

      <div className="dropdown">
        <button 
          className="btn btn-primary dropdown-toggle d-flex align-items-center gap-2"
          type="button" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          Favorites <span className="badge bg-secondary">{combinedLiked.length}</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end bg-dark text-white p-2" style={{ minWidth: "200px" }}>
          {combinedLiked.length === 0 ? (
            <li className="text-center text-muted small">No favorites yet</li>
          ) : (
            <>
              {combinedLiked.map(item => (
                <li 
                  key={`${item.type}-${item.uid}`}
                  className="d-flex justify-content-between align-items-center py-1"
                >
                  <span>{item.name}</span>
                  <FaTrash 
                    className="text-danger" 
                    role="button" 
                    onClick={() => handleDelete(item.uid, item.type)}
                  />
                </li>
              ))}
              <li><hr className="dropdown-divider bg-secondary" /></li>
              <li className="text-center text-muted small">
                Total: {combinedLiked.length} items
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};