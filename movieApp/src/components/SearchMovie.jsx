import React, { useState, useEffect } from 'react';
import CardMovie from './CardMovie';
import { useFavoritosContext } from '../context/favoritesContext'; 

const SearchMovie = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieResults, setMovieResults] = useState([]);
  const { toggleLike, esFavorito } = useFavoritosContext(); 

  const key = import.meta.env.VITE_TMDB_KEY;

  const handleSearch = async (query) => {
    setSearchTerm(query);

    if (query.length < 2) {
      setMovieResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=es-ES&query=${query}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMovieResults(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleLikeToggle = (id, title, posterPath) => {
    toggleLike(id, title, posterPath); 
  };

  return (
    <form className='relative m-14 mb-96'>
      <h4 className='m-4'>Busca tu Película</h4>
      <div className='relative'>
        <input
          type='search'
          placeholder=' ...'
          className='w-[500px] p-4 rounded-full bg-gray-800'
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {movieResults.length > 0 && (
        <div className='relative flex justify-center flex-wrap gap-6 my-16 '>
          {movieResults.map((movie) => (
            <CardMovie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              overview={movie.overview}
              posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              onLikeToggle={() => handleLikeToggle(movie.id, movie.title, `https://image.tmdb.org/t/p/w500${movie.poster_path}`)}
              liked={esFavorito(movie.id)} 
            />
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchMovie;