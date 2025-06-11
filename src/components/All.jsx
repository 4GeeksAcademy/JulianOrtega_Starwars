import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect, useRef, useCallback } from "react";
import { MdFavorite } from "react-icons/md";
import 'animate.css';

export const All = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { store, dispatch } = useGlobalReducer();
  
  // Estados para cada categoría
  const [currentPages, setCurrentPages] = useState({
    characters: 1,
    planets: 1,
    vehicles: 1
  });

  const typeToEndpoint = {
    characters: 'people',
    planets: 'planets',
    vehicles: 'vehicles'
  };  
  
  const [hasMore, setHasMore] = useState({
    characters: true,
    planets: true,
    vehicles: true
  });
  
  const [isLoading, setIsLoading] = useState({
    characters: false,
    planets: false,
    vehicles: false
  });
  
  const [likedItems, setLikedItems] = useState({
    characters: [],
    planets: [],
    vehicles: []
  });
  
  const [isClicked, setIsClicked] = useState(false);
  const observers = {
    characters: useRef(),
    planets: useRef(),
    vehicles: useRef()
  };

  // Cargar likes del localStorage
  useEffect(() => {
    const loadLikes = (type) => {
      const saved = localStorage.getItem(`liked${type}`);
      return saved ? JSON.parse(saved) : [];
    };

    setLikedItems({
      characters: loadLikes('Characters'),
      planets: loadLikes('Planets'),
      vehicles: loadLikes('Vehicles')
    });
  }, []);

  // Manejar likes
  const handleLike = useCallback((uid, type) => {
    setLikedItems(prev => {
      console.log(prev, type);
      
      const newLiked = prev[type].includes(uid)
        ? prev[type].filter(id => id !== uid)
        : [...prev[type], uid];
      
        const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
      localStorage.setItem(`liked${capitalizedType}`, JSON.stringify(newLiked));
      return { ...prev, [type]: newLiked };
    });
    
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  }, []);

  // Observadores para infinite scroll
  const createObserver = (type) => useCallback(node => {
    if (isLoading[type]) return;
    if (observers[type].current) observers[type].current.disconnect();

    observers[type].current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore[type]) {
        setCurrentPages(prev => ({ ...prev, [type]: prev[type] + 1 }));
      }
    });

    if (node) observers[type].current.observe(node);
  }, [isLoading[type], hasMore[type]]);

  const lastRefs = {
    characters: createObserver('characters'),
    planets: createObserver('planets'),
    vehicles: createObserver('vehicles')
  };

  // Fetch datos
  const fetchData = async (type) => {
    const endpoint = typeToEndpoint[type]; // <-- Aquí haces la conversión
    setIsLoading(prev => ({ ...prev, [type]: true }));
    
    try {
      const response = await fetch(
        `${API_URL}${endpoint}?page=${currentPages[type]}&limit=20`
      );
      const data = await response.json();
  
      dispatch({
        type,
        payload: currentPages[type] === 1 
          ? data.results 
          : [...store[type], ...data.results]
      });
  
      setHasMore(prev => ({ ...prev, [type]: data.results.length === 20 }));
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    } finally {
      setIsLoading(prev => ({ ...prev, [type]: false }));
    }
  };
  

  // Efectos para cargar datos
  useEffect(() => { fetchData('characters'); }, [currentPages.characters]);
  useEffect(() => { fetchData('planets'); }, [currentPages.planets]);
  useEffect(() => { fetchData('vehicles'); }, [currentPages.vehicles]);

  // Componente de tarjeta reutilizable
  const Card = ({ item, type }) => (
    <div
      className="card bg-dark text-white mx-2 shadow-lg"
      style={{
        minWidth: "300px",
        height: "400px",
        flex: "0 0 auto",
        scrollSnapAlign: "start"
      }}
    >
      <img
        src={item.imageUrl || "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"}
        className="card-img-top"
        alt={item.name}
        style={{
          height: "70%",
          objectFit: "cover",
          width: "100%",
          borderRadius: "8px 8px 0 0"
        }}
      />
      <div
        className="p-3"
        style={{
          height: "30%",
          borderTop: "4px solid rgb(158, 79, 96)",
          background: `
            repeating-linear-gradient(
              135deg,
              rgba(49, 48, 48, 0.8) 1px 4px,
              transparent 1px 10px
            ),
            rgb(41, 40, 40)
          `,
          borderRadius: "0 0 8px 8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <h5 className="card-title mb-1 text-uppercase" style={{ fontSize: "1rem" }}>
          {item.name}
        </h5>
        <div className="d-flex justify-content-between align-items-center">
          <Link 
            to={`/${type}/${item.uid}`} 
            className="text-decoration-none text-danger small"
          >
            Databank
          </Link>
          <div 
            className={`rounded-2 p-2 border ${
              likedItems[type].includes(item.uid) ? 'border-danger' : 'border-secondary'
            } clickable-box transition-all`}
            style={{ width: '40px', height: '40px' }}
            onClick={() => handleLike(item.uid, type)}
          >
            <MdFavorite
              className={`fs-5 ${
                likedItems[type].includes(item.uid) ? 'text-danger' : 'text-light'
              } ${isClicked ? 'animate__animated animate__rubberBand' : ''}`}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizar secciones
  const renderSection = (type, title) => (
    <div className="mb-5">
      <h2 className="text-light mb-4 ps-2">{title}</h2>
      <div className="d-flex flex-nowrap overflow-x-auto gap-4 p-4">
        {store[type]?.map((item, index) => {
          const isLast = store[type].length === index + 1;
          return (
            <div
              key={`${type}-${index}`}
              ref={isLast ? lastRefs[type] : null}
            >
              <Card item={item} type={type} />
            </div>
          );
        })}
        {!hasMore[type] && (
          <div className="text-muted align-self-center px-4">
            Fin de {title.toLowerCase()}
          </div>
        )}
      </div>
      {isLoading[type] && (
        <div className="text-center text-light py-2">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="container-fluid p-4">
      {renderSection('characters', 'Personajes')}
      {renderSection('planets', 'Planetas')}
      {renderSection('vehicles', 'Vehículos')}
    </div>
  );
};