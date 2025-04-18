import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect, useRef, useCallback } from "react";
import { MdFavorite } from "react-icons/md";
import 'animate.css';

export const Characters = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { store, dispatch } = useGlobalReducer();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [likedUids, setLikedUids] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const observer = useRef();

  useEffect(() => {
    const savedLikes = localStorage.getItem('likedCharacters');
    if (savedLikes) {
      setLikedUids(JSON.parse(savedLikes));
    }
  }, []);

  const handleLike = useCallback((uid) => {
    setLikedUids(prev => {
      const newLiked = prev.includes(uid) 
        ? prev.filter(id => id !== uid) 
        : [...prev, uid];
      
      localStorage.setItem('likedCharacters', JSON.stringify(newLiked));
      return newLiked;
    });
    
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 3000);
  }, []);

  const lastItemRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) setCurrentPage(prev => prev + 1);
    });

    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  const fetchCharacters = async (page) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}people?page=${page}&limit=20`, {
        headers: { 'Accept': 'application/json' }
      });
      const data = await response.json();

      dispatch({
        type: 'characters',
        payload: page === 1 ? data.results : [...store.characters, ...data.results]
      });

      setHasMore(data.results.length === 20);

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
        const isLiked = likedUids.includes(character.uid);
        const isLastItem = store.characters.length === index + 1;
        
        const cardContent = (
          <>
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
              <div className="d-flex flex-row justify-content-between align-items-center w-100">
                <Link to={`/characters/${character.uid}`} className="text-decoration-none text-danger small">
                  Databank
                </Link>
                <div 
                  className={`
                    rounded-2 p-2 border 
                    ${isLiked ? 'border-danger' : 'border-secondary'} 
                    ${isClicked ? 'shadow-sm' : ''}
                    transition-all
                    d-inline-flex align-items-center justify-content-center
                    clickable-box
                  `}
                  style={{
                    width: '40px',
                    height: '40px'
                  }}
                  role="button"
                  onClick={() => handleLike(character.uid)}
                  aria-label={isLiked ? 'Quitar like' : 'Dar like'}
                  tabIndex={0}
                >
                  <MdFavorite 
                    className={`
                      fs-5 
                      ${isLiked ? 'text-danger' : 'text-light'}
                      ${isClicked ? 'animate__animated animate__rubberBand' : ''}
                    `}
                  />
                </div>
              </div>
            </div>
          </>
        );

        return isLastItem ? (
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
            {cardContent}
          </div>
        ) : (
          <div
            key={index}
            className="card bg-dark text-white"
            style={{
              maxWidth: "200px",
              height: "300px",
              flex: "1 1 200px"
            }}
          >
            {cardContent}
          </div>
        );
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