import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritosContext = createContext();

export const useFavoritosContext = () => {
  return useContext(FavoritosContext);
};

export const FavoritosContextProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  const agregarFavorito = (pelicula) => {
    setFavoritos((favoritosAnteriores) => [...favoritosAnteriores, pelicula]);
  };

  const quitarFavorito = (idPelicula) => {
    setFavoritos((favoritosAnteriores) =>
      favoritosAnteriores.filter((pelicula) => pelicula.id !== idPelicula)
    );
  };

  const esFavorito = (idPelicula) => {
    return favoritos.some((pelicula) => pelicula.id === idPelicula);
  };

  const toggleLike = (idPelicula, title, posterPath) => {
    const nuevaPelicula = { id: idPelicula, title, posterPath, liked: true };

    if (esFavorito(idPelicula)) {
      quitarFavorito(idPelicula);
    } else {
      agregarFavorito(nuevaPelicula);
    }
  };

  useEffect(() => {
    const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos')) || [];
    if (favoritosGuardados.length > 0) {
      console.log('Cargando favoritos del localStorage:', favoritosGuardados);
      setFavoritos(favoritosGuardados);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    console.log('Guardando favoritos en el localStorage:', favoritos);
  }, [favoritos]);

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleLike, esFavorito, agregarFavorito, quitarFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};