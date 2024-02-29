import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import GridMoviePage from './pages/GridMoviePage';
import MovieDetailPage from './pages/MovieDetailsPage';

export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='top-rated' element={<GridMoviePage />} />
        <Route path='detail/:id' element={<MovieDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
