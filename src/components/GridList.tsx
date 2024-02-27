import {
  GridColumn as Column,
  Grid,
  GridPageChangeEvent,
  GridToolbar,
} from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';
import '@progress/kendo-theme-default/dist/all.css';
import { useEffect, useState } from 'react';
import IListMovieGenre from '../interfaces/IListMovieGenre';
import { IResults } from '../interfaces/ITopRatedMovies';
import { ListMovieGenre, TopRatedMovies } from '../utils/api';
import { AverageCell } from './CustomAverageCell';
import { GenreCell } from './CustomGenreCell';
import { MovieCell } from './CustomMovieCell';
import { OverviewCell } from './CustomOverviewCell';

export default function GridList() {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const [movieList, setMovieList] = useState<IResults[]>([]);
  const [listMovieGenre, setListMovieGenre] = useState<IListMovieGenre>();

  useEffect(() => {
    const fetcAPI = async () => {
      for (let i = 1; i < 11; i++) {
        const { data: topRatedMoviesDataT } = await TopRatedMovies(i);
        setMovieList((prev) => [...prev, ...topRatedMoviesDataT.results]);
      }
      const { data: listMovieGenreData } = await ListMovieGenre();
      setListMovieGenre(listMovieGenreData);
    };
    fetcAPI();
  }, []);

  useEffect(() => console.log(movieList), [movieList]);

  const handlePaginationChange = async (event: GridPageChangeEvent) => {
    setSkip(event.page.skip);
    setTake(event.page.take);
  };

  return (
    <Grid
      className='w-full'
      style={{ height: '700px' }}
      data={movieList.slice(skip, skip + take)}
      pageable={true}
      skip={skip}
      take={take}
      onPageChange={handlePaginationChange}
      total={movieList.length}
      size={'small'}
      sortable={true}
    >
      <GridToolbar>
        <Input
          // value={filterValue}
          // onChange={onFilterChange}
          style={{
            border: '2px solid #ccc',
            boxShadow: 'inset 0px 0px 0.5px 0px rgba(0,0,0,0.0.1)',
            width: '170px',
            height: '30px',
            marginRight: '10px',
          }}
          placeholder='Filter by name...'
        />
      </GridToolbar>
      <Column field='title' title='Name' cell={MovieCell} width={300} />
      <Column
        field='genre_ids'
        title='Genrer'
        cell={(e) => GenreCell(e, listMovieGenre!)}
        width={150}
      />
      <Column
        field='vote_average'
        title='Vote Average'
        width={200}
        cell={AverageCell}
      />
      <Column field='release_date' title='Release Date' width={200} />
      <Column
        field='overview'
        title='Overview'
        width={600}
        cell={OverviewCell}
      />
    </Grid>
  );
}
