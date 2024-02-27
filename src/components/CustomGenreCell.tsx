import { GridCustomCellProps } from '@progress/kendo-react-grid';
import { useEffect, useState } from 'react';
import IListMovieGenre from '../interfaces/IListMovieGenre';

export const GenreCell = (
  props: GridCustomCellProps,
  listMovieGenre: IListMovieGenre
) => {
  const { dataItem } = props;
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    listMovieGenre?.genres.forEach((obj) =>
      dataItem.genre_ids.forEach((id: number) =>
        id === obj.id ? setGenres((prev) => [...prev, obj.name]) : null
      )
    );
  }, [dataItem, listMovieGenre]);

  return (
    <td className=''>
      {genres.map((genrer) => (
        <h1 className='font-bold'>{genrer}</h1>
      ))}
    </td>
  );
};
