import React, { useState } from 'react';
import CardMovie from './CardMovie';
import Pagination from './Pagination';
import usePopularMovies from '../hooks/usePopularMovies.jsx';


const PopularMovies = () => {
  const { movies, loading, currentPage, totalPages, paginate } = usePopularMovies();


  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!movies || movies.length === 0) {
    return <p>No hay películas disponibles.</p>;
  }


  return (
    <div className="popular-movies">
      <h2 className='text-2xl text-center mt-8 font-semibold'>Películas populares</h2>
      <div className="movie-list flex justify-center flex-wrap gap-6 my-16">
        {movies.map((movie) => (
          <CardMovie
            key={movie.id}
             id={movie.id}
            title={movie.title}
            overview={movie.overview}
            posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
        ))}
      </div>
      <Pagination
        activePage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      />
    </div>
  );
};


export default PopularMovies;