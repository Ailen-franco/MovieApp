import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function Pagination({ activePage, totalPages, onPageChange }) {
  const next = () => {
    if (activePage < totalPages) {
      onPageChange(activePage + 1);
    }
  };

  const prev = () => {
    if (activePage > 1) {
      onPageChange(activePage - 1);
    }
  };

  const getPageItemProps = (index) => ({
    variant: activePage === index ? "filled" : "text",
    color: "gray",
    onClick: () => onPageChange(index),
    className: "rounded-full",
  });

  return (
    <div className="flex justify-center gap-4 mb-14">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={activePage === 1}
        color="white"
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Anterior
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <IconButton key={index} {...getPageItemProps(index + 1)}>
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={activePage === totalPages}
        color="white"
      >
        Siguiente <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default Pagination;