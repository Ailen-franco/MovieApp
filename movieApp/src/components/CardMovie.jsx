import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Tooltip } from "@material-tailwind/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useFavoritosContext } from '../context/favoritesContext';

function CardMovie({ id, title, posterPath }) {
  const [isHovered, setIsHovered] = useState(false);
  const { agregarFavorito, quitarFavorito, esFavorito } = useFavoritosContext();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(esFavorito(id));
  }, [id, esFavorito]);

  const handleLikeToggle = () => {
    setLiked(!liked);

    if (!liked) {
      agregarFavorito({ id, title, posterPath, liked: true });
    } else {
      quitarFavorito(id);
    }
  };

  return (
    <div
      className="flex justify-center flex-wrap gap-8 my-2 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        shadow={false}
        className="relative grid h-[18rem] w-full max-w-[15rem] items-end justify-center overflow-hidden text-center cursor-pointer" 
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
          style={{ backgroundImage: `url('${posterPath}')` }}
        >
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/50 via-black/50 opacity-40 hover:opacity-0" />
          {(isHovered || liked) && (
            <div className="like-icon absolute top-2 right-2">
              {liked ? (
                <FaHeart size={20} className="text-white" onClick={handleLikeToggle} />
              ) : (
                <FaRegHeart size={20} className="text-gray-300" onClick={handleLikeToggle} />
              )}
            </div>
          )}
        </CardHeader>
        <CardBody className="relative py-14 px-6 md:px-12">
        </CardBody>
      </Card>
      <Tooltip content="Ver detalle">
        <Link to={`/detail/${id}`}>
          <span className="cursor-pointer rounded-full border text-xs border-gray-700 bg-gray-900/95 p-3 text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-800/60 hover:text-gray-400 hover:!opacity-100 group-hover:opacity-70">
            Ver
          </span>
        </Link>
      </Tooltip>
    </div>
  );
}

export default CardMovie;