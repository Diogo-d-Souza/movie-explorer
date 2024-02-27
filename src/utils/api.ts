import axios from 'axios';
import IMovieList from '../interfaces/IMovieList';
import ITopRatedMovies from '../interfaces/ITopRatedMovies';

const { VITE_MOVIES_LIST, VITE_API_KEY, VITE_TOP_RATED } = import.meta.env;

export const MovieList = async () => {
  const url = VITE_MOVIES_LIST + '&' + VITE_API_KEY;
  return axios.get<IMovieList>(url).then((res) => res);
};

export const TopRatedMovies = async () => {
  const url = VITE_TOP_RATED + VITE_API_KEY;
  return axios.get<ITopRatedMovies>(url).then((res) => res);
};
