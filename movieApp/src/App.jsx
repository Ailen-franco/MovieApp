import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FavoritesMovies from './components/FavoritesMovies';
import { Header } from './components/Header';
import Home from './components/Home';
import LatestReleasesMovies from './components/LatestReleasesMovies';
import PopularMovies from './components/PopularMovies';
import SearchMovie from './components/SearchMovie';
import DetailMovie from './components/DetailMovie'
import Footer from './components/Footer';
import { FavoritosContextProvider } from './context/favoritesContext';

function App() {
  return (
    <FavoritosContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/latestReleasesMovies" element={<LatestReleasesMovies />} />
          <Route path="/popularMovies" element={<PopularMovies />} />
          <Route path="/favoritesMovies" element={<FavoritesMovies />} />
          <Route path="/searchMovie" element={<SearchMovie />} />
          <Route path='/detail/:movieId' element={<DetailMovie />} />
        </Routes>
        <Footer />
      </Router>
    </FavoritosContextProvider>
  );
}

export default App;
