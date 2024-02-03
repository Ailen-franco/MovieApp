import React, { useEffect, useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

const TrailerMovie = ({ trailerUrl, onClose }) => {
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    const fetchTrailerKey = async () => {
      try {
        const response = await fetch(trailerUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const key = data.results[0]?.key || null;
        setVideoKey(key);
      } catch (error) {
        console.error('Error fetching trailer key:', error);
      }
    };

    fetchTrailerKey();
  }, [trailerUrl]);

  return (
    <Dialog size="lg" active={!!videoKey} toggler={() => onClose && onClose()}>
      <DialogHeader>
        <h5 className="text-xl font-bold">Trailer</h5>
      </DialogHeader>
      <DialogBody>
        {videoKey ? (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoKey}`}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : (
          <p>No se encontró el trailer.</p>
        )}
      </DialogBody>
      <DialogFooter>
        <Button
          color="red"
          buttonType="link"
          onClick={() => onClose && onClose()}
          ripple="dark"
        >
          Cerrar
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default TrailerMovie;