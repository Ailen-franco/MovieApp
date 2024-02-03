import React from 'react';
import CardMovie from './CardMovie';
import { useFavoritosContext } from '../context/favoritesContext';
import AlertMovie from "./AlertMovie"

const FavoriteMovies = () => {
  const { favoritos } = useFavoritosContext();

  if (!favoritos || favoritos.length === 0) {
    return <AlertMovie />;
  }

  return (
    <div className="favorite-movies">
      <h2 className="text-2xl text-center mt-8 font-semibold">Películas Favoritas</h2>
      <div className="movie-list flex justify-center flex-wrap gap-6 my-16">
        {favoritos.map((movie) => (
          <CardMovie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            overview={movie.overview}
            posterPath={movie.posterPath}
            liked={true} 
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteMovies;