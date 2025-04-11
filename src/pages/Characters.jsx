import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect, useRef, useCallback } from "react";

export const Characters = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { store, dispatch } = useGlobalReducer();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const observer = useRef();

  const lastItemRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore) setCurrentPage(prev => prev + 1);
    });
    
    if(node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  const fetchCharacters = async (page) => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}people?page=${page}&limit=20`, {
        headers: { 'Accept': 'application/json' }
      });
      const data = await response.json();

      setLimit(data.results.length)

      limit < 20 ? setHasMore(false) : setHasMore(true);
      
      if(limit == 20){
        dispatch({ 
          type: 'characters',
          payload: page === 1 ? data.results : [...store.characters, ...data.results]
        });
      }
      
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  return (
    <div className="d-flex flex-wrap gap-4 justify-content-center p-4">
      {store.characters?.map((character, index) => {
        // Si es el último elemento, añade el ref
        if(store.characters.length === index + 1) {
          return (
            <div 
              ref={lastItemRef}
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
                <Link to={`/${character.uid}`} className="text-decoration-none text-danger small">
                  Databank
                </Link>
              </div>
            </div>
          )
        }
        
        return (
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
              <Link to={`/characters/${character.uid}`} className="text-decoration-none text-danger small">
                Databank
              </Link>
            </div>
          </div>
        )
      })}

      {isLoading && (
        <div className="w-100 text-center text-light py-4">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      {!hasMore && (
        <div className="w-100 text-center text-muted py-4">
          ¡Has llegado al final!
        </div>
      )}
    </div>
  );
};