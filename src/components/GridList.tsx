import { DataResult, State, process } from '@progress/kendo-data-query';
import {
  GridColumn as Column,
  Grid,
  GridDataStateChangeEvent,
  GridToolbar,
} from '@progress/kendo-react-grid';
import { Input, InputChangeEvent } from '@progress/kendo-react-inputs';
import '@progress/kendo-theme-default/dist/all.css';
import { useEffect, useState } from 'react';
import IListMovieGenre from '../interfaces/IListMovieGenre';
import { IResults } from '../interfaces/ITopRatedMovies';
import { ListMovieGenre, TopRatedMovies } from '../utils/api';
import { AverageCell } from './CustomCells/CustomAverageCell';
import { GenreCell } from './CustomCells/CustomGenreCell';
import { MovieCell } from './CustomCells/CustomMovieCell';
import { OverviewCell } from './CustomCells/CustomOverviewCell';

const initialDataState: State = {
  sort: [],
  take: 10,
  skip: 0,
  filter: {
    logic: 'and',
    filters: [],
  },
};

export default function GridList() {
  const [dataState, setDataState] = useState<State>(initialDataState);
  const [movieList, setMovieList] = useState<IResults[]>([]);
  const [listMovieGenre, setListMovieGenre] = useState<IListMovieGenre>();
  const [filterValue, setFilterValue] = useState<string>();
  const [dataResult, setDataResult] = useState<DataResult>(
    process(movieList, dataState)
  );

  useEffect(() => {
    const fetcAPI = async () => {
      const data = [];
      for (let i = 1; i < 11; i++) {
        const { data: topRatedMoviesDataT } = await TopRatedMovies(i);
        setMovieList((prev) => [...prev, ...topRatedMoviesDataT.results]);
        data.push(...topRatedMoviesDataT.results);
      }
      setDataResult(process(data, initialDataState));
      const { data: listMovieGenreData } = await ListMovieGenre();
      setListMovieGenre(listMovieGenreData);
    };
    fetcAPI();
  }, []);

  const onFilterChange = (ev: InputChangeEvent) => {
    const value = ev.value;
    setFilterValue(ev.value);
    const newData = movieList.filter((item) => {
      let match = false;
      for (const property in item) {
        if (
          item[property as keyof typeof item]
            .toString()
            .toLocaleLowerCase()
            .indexOf(value.toLocaleLowerCase()) >= 0
        ) {
          match = true;
        }
      }
      return match;
    });

    const clearedPagerDataState = { ...dataState, take: 10, skip: 0 };
    const processedData = process(newData, clearedPagerDataState);
    setDataResult(processedData);
    setDataState(clearedPagerDataState);
  };

  const onDataStateChange = (e: GridDataStateChangeEvent) => {
    setDataState(e.dataState);
    setDataResult(process(movieList, e.dataState));
  };

  return (
    <Grid
      className='w-full'
      style={{ height: '700px' }}
      data={dataResult}
      {...dataState}
      onDataStateChange={onDataStateChange}
      pageable={true}
      filterable={true}
      size={'small'}
    >
      <GridToolbar className='text-black font-bold'>
        <Input
          value={filterValue}
          onChange={onFilterChange}
          style={{
            border: '2px solid #8a8989',
            boxShadow: 'inset 0px 0px 0.5px 0px rgba(0,0,0,0.0.1)',
            width: '170px',
            height: '30px',
            marginRight: '10px',
            padding: '4px',
            borderRadius: '12px',
          }}
          placeholder='Search in all columns'
        />
      </GridToolbar>
      <Column
        field='title'
        title='Movie name'
        filter='text'
        cell={MovieCell}
        width={300}
        headerClassName='text-black font-bold text-base'
      />
      <Column
        field='genre_ids'
        title='Genrer'
        filterable={false}
        cell={(e) => GenreCell(e, listMovieGenre!)}
        width={150}
        headerClassName='text-black font-bold text-base'
      />
      <Column
        field='vote_average'
        title='Vote Average'
        filter='numeric'
        width={200}
        cell={AverageCell}
        headerClassName='text-black font-bold text-base'
      />
      <Column
        field='release_date'
        title='Release Date'
        filter='date'
        width={200}
        headerClassName='text-black font-bold text-base'
      />
      <Column
        field='overview'
        title='Overview'
        filter='text'
        width={600}
        cell={OverviewCell}
        headerClassName='text-black font-bold text-base'
      />
    </Grid>
  );
}
