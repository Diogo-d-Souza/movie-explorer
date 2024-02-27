import { GridCustomCellProps } from '@progress/kendo-react-grid';

export const OverviewCell = (props: GridCustomCellProps) => {
  const { dataItem } = props;
  return (
    <td>
      <div className='overflow-auto max-h-20'>{dataItem.overview}</div>
    </td>
  );
};
