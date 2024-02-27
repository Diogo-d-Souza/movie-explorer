import axios from 'axios';
import IMovieList from '../interfaces/IMovieList';

const { VITE_MOVIES_LIST, VITE_API_KEY } = import.meta.env;

export const MovieList = async () => {
  const url = VITE_MOVIES_LIST + '&' + VITE_API_KEY;
  return axios.get<IMovieList>(url).then((res) => res);
};
