import { GridCustomCellProps } from '@progress/kendo-react-grid';
const { VITE_IMG } = import.meta.env;

export const MovieCell = (props: GridCustomCellProps) => {
  const { dataItem } = props;

  if (!dataItem || !dataItem.poster_path) {
    return dataItem.title;
  }
  const imageDataUrl = `${VITE_IMG}${dataItem.poster_path}`;
  return (
    <td>
      <div className='flex items-center gap-4 p-4'>
        <img src={imageDataUrl} className='w-14' />
        <h1 className='font-bold'>{dataItem.title}</h1>
      </div>
    </td>
  );
};
