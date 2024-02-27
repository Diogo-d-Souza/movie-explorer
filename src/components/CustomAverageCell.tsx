import { GridCustomCellProps } from '@progress/kendo-react-grid';
import { ProgressBar } from '@progress/kendo-react-progressbars';
import { useEffect, useState } from 'react';

export const AverageCell = (props: GridCustomCellProps) => {
  const { dataItem } = props;
  const [progressStyles, setProgressStyles] = useState({
    background: '',
  });

  useEffect(() => {
    const updateAppearance = (progressBackground: string) => {
      setProgressStyles({ background: progressBackground });
    };
    if (dataItem.vote_average == 0) {
      updateAppearance('');
    } else if (dataItem.vote_average <= 6) {
      updateAppearance('#ee9f05');
    } else if (dataItem.vote_average >= 6 && dataItem.vote_average <= 8) {
      updateAppearance('#df6e11');
    } else if (dataItem.vote_average > 8) {
      updateAppearance('#8EBC00');
    }
  }, [dataItem.vote_average]);
  return (
    <td>
      <ProgressBar
        value={dataItem.vote_average * 10}
        progressStyle={progressStyles}
        style={{ color: 'black' }}
      />
    </td>
  );
};
