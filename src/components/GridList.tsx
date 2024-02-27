import { GridColumn as Column, Grid } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import { useEffect, useState } from 'react';
import ITopRatedMovies from '../interfaces/ITopRatedMovies';
import { TopRatedMovies } from '../utils/api';

export default function GridList() {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const [movieList, setMovieList] = useState<ITopRatedMovies>();
  useEffect(() => {
    const fetcAPI = async () => {
      const { data } = await TopRatedMovies();
      setMovieList(data);
    };
    fetcAPI();
  }, []);

  const getNextMovies = async () => {};

  useEffect(() => console.log(movieList), [movieList]);

  return (
    <>
      <Grid
        data={movieList?.results}
        pageable={true}
        skip={skip}
        take={take}
        onPageChange={() => {}}
        total={movieList?.total_results}
      >
        <Column field='id' title='ID' />
        <Column field='title' title='Name' />
      </Grid>
    </>
  );
}
