import React from "react";
import { FaTrash } from "react-icons/fa";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const { store } = useGlobalReducer();
  const [likedUids, setLikedUids] = useState([]);
  
  // Obtener los personajes favoritos
  const likedCharacters = store.characters.filter(character => 
    likedUids.includes(character.uid)
  );

  // Recargar favoritos
  useEffect(() => {
    likedCharacters = store.characters.filter(character => 
      likedUids.includes(character.uid)
    );
  }, [localStorage.getItem('likedCharacters')]);

  // Cargar favoritos desde localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem('likedCharacters');
    if (savedLikes) {
      setLikedUids(JSON.parse(savedLikes));
    }
  }, []);

  // Eliminar favorito
  const handleDelete = (uid) => {
    const newLiked = likedUids.filter(id => id !== uid);
    setLikedUids(newLiked);
    localStorage.setItem('likedCharacters', JSON.stringify(newLiked));
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
          Favorites <span className="badge bg-secondary">{likedCharacters.length}</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end bg-dark text-white p-2" style={{ minWidth: "200px" }}>
          {likedCharacters.length === 0 ? (
            <li className="text-center text-muted small">No favorites yet</li>
          ) : (
            <>
              {likedCharacters.map(character => (
                <li 
                  key={character.uid}
                  className="d-flex justify-content-between align-items-center py-1"
                >
                  <span>{character.name}</span>
                  <FaTrash 
                    className="text-danger" 
                    role="button" 
                    onClick={() => handleDelete(character.uid)}
                  />
                </li>
              ))}
              <li><hr className="dropdown-divider bg-secondary" /></li>
              <li className="text-center text-muted small">
                Total: {likedCharacters.length} items
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};