import axios from 'axios';
import { useState, useEffect } from 'react';
import endpoints from '../services/movieServices';


const usePopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 1;


  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(`${endpoints.popular}&page=${currentPage}`);
      setMovies(response.data.results);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };


  useEffect(() => {
    fetchPopularMovies();
  }, [currentPage]);

  const totalPages = Math.ceil(movies.length / moviesPerPage);


  const paginate = (newPage) => {
    setCurrentPage(newPage);
  };


  return {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
    paginate,
  };
};


export default usePopularMovies;