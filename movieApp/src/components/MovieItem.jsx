import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useFavoritosContext } from '../context/favoritesContext';
import { createImageUrl } from '../services/movieServices';

export default function MovieItem({ movie }) {
  const { id, title, backdrop_path, poster_path } = movie;
  const { toggleLike, esFavorito } = useFavoritosContext();
  const [like, setLike] = useState(false);

  useEffect(() => {
    setLike(esFavorito(id));
  }, [id, esFavorito]);

  const handleLikeToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();

    setLike(!like);

    toggleLike(id, title, createImageUrl(poster_path, 'w500'));
  };

  return (
    <div className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'>
      <Link to={`/detail/${id}`}>
        <img
          className='w-full h-40 block object-cover object-top'
          src={createImageUrl(backdrop_path ?? poster_path, 'w500')}
          alt={title}
        />
        <div className='absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100'>
          <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full'>
            {title}
          </p>
          <p>
            {like ? (
              <FaHeart size={20} className='absolute top-2 right-2 text-gray-300' onClick={handleLikeToggle} />
            ) : (
              <FaRegHeart size={20} className='absolute top-2 right-2 text-gray-300' onClick={handleLikeToggle} />
            )}
          </p>
        </div>
      </Link>
    </div>
  );
}