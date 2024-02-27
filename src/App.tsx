import { GridColumn as Column, Grid } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import { useEffect, useState } from 'react';
import './App.css';
import IMovieList from './interfaces/IMovieList';
import { MovieList } from './utils/api';

function App() {
  const [movieList, setMovieList] = useState<IMovieList>();
  useEffect(() => {
    const fetcAPI = async () => {
      const { data } = await MovieList();
      setMovieList(data);
    };
    fetcAPI();
  }, []);

  return (
    <>
      <Grid
        style={{
          height: '400px',
        }}
        data={movieList?.genres}
      >
        <Column field='id' title='ID' width='40px' />
        <Column field='name' title='Name' width='250px' />
      </Grid>
    </>
  );
}

export default App;
