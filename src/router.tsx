import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GenreMovieListPage from './pages/GenreMovieListPage';
import GridMoviePage from './pages/GridMoviePage';
import MovieDetailPage from './pages/MovieDetailsPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='movie-list' element={<GenreMovieListPage />} />
        <Route path='top-rated' element={<GridMoviePage />} />
        <Route path='detail/:id' element={<MovieDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
