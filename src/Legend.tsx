import { scaleOrdinal } from 'd3-scale';
import * as React from 'react';
import colorScheme from './colors';
import { IHistogramDataSet } from './Histogram';

interface IProps {
  className?: string;
  theme?: string[];
  data: {
    bins: string[],
    counts: IHistogramDataSet[];
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
};

const Legend: React.SFC<IProps> = ({ className, theme = colorScheme, data, onSelect, visible }) => {
  const scheme = scaleOrdinal(theme);
  const labels = data.bins;
  return (
    <div className={className}>
      <ul style={listStyle}>
        {
          labels.map((label) => {
            const active = (visible.hasOwnProperty(label) && visible[label]) || !visible.hasOwnProperty(label);
            return (
              <li key={label}>
                <div style={{
                  ...legendIconStyle,
                  backgroundColor: active ? scheme(label) : '#FFF',
                  border: '2px solid ' + scheme(label),
                }}
                  onClick={() => onSelect(label)}>
                </div> {label}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Legend;
