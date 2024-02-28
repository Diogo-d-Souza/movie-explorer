import axios from 'axios';
import IListMovieGenre from '../interfaces/IListMovieGenre';
import ITopRatedMovies from '../interfaces/ITopRatedMovies';

const { VITE_MOVIES_LIST, VITE_API_KEY, VITE_TOP_RATED, VITE_SEARCH_MOVIE } =
  import.meta.env;

export const ListMovieGenre = async () => {
  const url = VITE_MOVIES_LIST + '&' + VITE_API_KEY;
  return axios.get<IListMovieGenre>(url).then((res) => res);
};

export const TopRatedMovies = async (pageNumber: number) => {
  const url = `${VITE_TOP_RATED}${VITE_API_KEY}&page=${pageNumber}`;
  return axios.get<ITopRatedMovies>(url).then((res) => res);
};

export const MovieDetail = async (movieId: string) => {
  const url = `${VITE_SEARCH_MOVIE}${movieId}?${VITE_API_KEY}`;
  return axios.get(url).then((res) => res);
};
