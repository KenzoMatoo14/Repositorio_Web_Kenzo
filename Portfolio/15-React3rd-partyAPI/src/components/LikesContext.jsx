import React, { createContext, useState, useContext } from "react";

// Crea el contexto
const LikesContext = createContext();

// Proveedor del contexto
export const LikesProvider = ({ children }) => {
  const [likesData, setLikesData] = useState({});

  const updateLikes = (movieId, likeChange, dislikeChange) => {
    setLikesData((prev) => ({
      ...prev,
      [movieId]: {
        likeCount: (prev[movieId]?.likeCount || 0) + likeChange,
        dislikeCount: (prev[movieId]?.dislikeCount || 0) + dislikeChange,
      },
    }));
  };

  return (
    <LikesContext.Provider value={{ likesData, updateLikes }}>
      {children}
    </LikesContext.Provider>
  );
};

// Hook para usar el contexto
export const useLikes = () => useContext(LikesContext);
