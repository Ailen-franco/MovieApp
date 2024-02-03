import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

const key = import.meta.env.VITE_TMDB_KEY;

const DetailMovie = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=es-ES`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMovieDetails(data);
        console.log('Movie details:', data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const openTrailerModal = async () => {
    try {
      const videoResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}&language=es-AR`);
      
      if (!videoResponse.ok) {
        throw new Error(`HTTP error! Status: ${videoResponse.status}`);
      }

      const videoData = await videoResponse.json();
      const videoKey = videoData.results[0]?.key;

      if (videoKey) {
        setTrailerUrl(`https://www.youtube.com/embed/${videoKey}`);
        setIsModalOpen(true);
      } else {
        console.error('No se encontró una URL de video para la película.');
      }
    } catch (error) {
      console.error('Error fetching movie videos:', error);
    }
  };

  const closeTrailerModal = () => {
    setTrailerUrl('');
    setIsModalOpen(false);
  };

  if (!movieDetails) {
    return <p>Cargando...</p>;
  }

  const { title, overview, backdrop_path, poster_path, genres } = movieDetails;

  return (
    <div className="relative bg-black inset-0 flex items-center">
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        alt={title}
        className="w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 flex items-center justify-center text-white z-10">
        <div className="text-left max-w-screen-xl flex space-x-8">
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              className="w-96 object-cover mb-2"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            <p className="text-white mb-4">{overview}</p>
            <div className="flex items-center mb-4">
              <p className="mr-2 font-bold">Género:</p>
              <ul className="flex">
                {genres.map((genre) => (
                  <li key={genre.id} className="mr-2">{genre.name}</li>
                ))}
              </ul>
            </div>
          
          </div>

          <div>
            <button className="text-white text-lg hover:text-blue-500 px-4 py-2 rounded-full flex items-center" onClick={openTrailerModal}>
              <FaPlay className="mr-2" />
              Ver Trailer
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal para el trailer */}
      <Dialog size="lg" open={isModalOpen} onClose={closeTrailerModal}>
        <DialogHeader>
          <h5 className="text-xl font-bold">Trailer</h5>
        </DialogHeader>
        <DialogBody>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              width="560"
              height="315"
              src={trailerUrl}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            color="blue"
            buttonType="link"
            onClick={closeTrailerModal}
            ripple={false}
          >
            Cerrar
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default DetailMovie;