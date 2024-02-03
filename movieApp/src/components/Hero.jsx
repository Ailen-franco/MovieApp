import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import endpoints, { createImageUrl } from '../services/movieServices';
import axios from 'axios';

export default function Hero() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        const response = await axios.get(endpoints.popular);
        const movies = response.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
      } catch (error) {
        console.error('Error fetching random movie:', error);
      }
    };

    
    fetchRandomMovie();
    const intervalId = setInterval(fetchRandomMovie, 5000);

    
    return () => clearInterval(intervalId);
  }, []);

  const truncate = (str, length) => {
    if (!str) return '';
    return str.length > length ? str.slice(0, length) + '...' : str;
  };

  if (!movie) return <p>fetching movie...</p>;

  const { title, backdrop_path, overview, id } = movie;

  return (
    <div className='w-full h-[550px] lg:h-[850px]'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[550px] lg:h-[850px] bg-gradient-to-r from-black'></div>
        <img className='w-full h-full object-cover object-top opacity-70' src={createImageUrl(backdrop_path, 'original')} alt={title} />

        <div className='absolute w-full top-[10%] lg:top-[25%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-6xl'>{title}</h1>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[354] text-gray-200'>{truncate(overview, 165)}</p>
          <Link to={`/detail/${id}`}>
            <button className="cursor-pointer rounded-full border mt-5 text-xs border-black-700 bg-white p-3 text-blue-500 font-bold transition-colors hover:border-gray-400 hover:bg-gray-800/60 hover:text-gray-400 hover:!opacity-100 group-hover:opacity-70">
              Ver más...
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}