import { Button } from '@progress/kendo-react-buttons';
import { GridCustomCellProps } from '@progress/kendo-react-grid';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const OverviewCell = (props: GridCustomCellProps) => {
  const { dataItem } = props;
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const movieId = dataItem?.id;
    navigate(`/detail/${movieId}`);
  };

  useEffect(() => console.log(dataItem), [dataItem]);
  return (
    <td className='flex flex-col'>
      <div className='overflow-auto max-h-20'>{dataItem.overview}</div>
      <Button
        className='flex rounded-full bg-yellow-500 hover:bg-yellow-600 justify-self-center self-center'
        onClick={handleButtonClick}
      >
        Details
      </Button>
    </td>
  );
};
