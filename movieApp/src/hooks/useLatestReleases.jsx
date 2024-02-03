import { useState, useEffect } from 'react';
import endpoints from '../services/movieServices';

const useLatestReleasesMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 1; 

  useEffect(() => {
    const fetchLatestReleases = async () => {
      try {
        const response = await fetch(`${endpoints.latest}&page=${currentPage}`);
        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching latest releases:', error);
        setLoading(false);
      }
    };

    fetchLatestReleases();
  }, [currentPage]);

  const totalPages = Math.ceil(movies.length / 1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return { movies, loading, currentPage, totalPages, paginate};
};

export default useLatestReleasesMovies;