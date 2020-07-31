import { scaleOrdinal } from 'd3-scale';
import React, { FC } from 'react';

import colorScheme from './colors';
import { IBarChartDataSet } from './Histogram';

interface IProps {
  className?: string;
  theme?: string[];
  data: {
    bins: string[],
    counts: IBarChartDataSet[];
  };
  onSelect: (label: string) => void;
  visible: { [key: string]: boolean };
}

const legendIconStyle = {
  cursor: 'pointer',
  display: 'inline-block',
  height: '1rem',
  margin: '0.25rem 0.5rem',
  width: '1rem',
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const liStyle = {
  display: 'flex',
  alignItems: 'center',
}

const Legend: FC<IProps> = ({
  className,
  theme = colorScheme,
  data,
  onSelect,
  visible,
}) => {
  const scheme: any = scaleOrdinal(theme);
  const labels = data.bins;
  return (
    <div className={className}>
      <ul style={listStyle}>
        {
          labels.map((label) => {
            const active = (visible.hasOwnProperty(label) && visible[label]) || !visible.hasOwnProperty(label);
            return (
              <li key={label}
                style={liStyle}>
                <div style={{
                  ...legendIconStyle,
                  backgroundColor: active ? scheme(label) : '#FFF',
                  border: '2px solid ' + scheme(label),
                }}
                  onClick={() => onSelect(label)}>
                </div>
                <div>
                  {label}
                </div>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Legend;
