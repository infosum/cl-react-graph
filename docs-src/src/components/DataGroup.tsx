import React, {
  Dispatch,
  ReactNode,
} from 'react';
import ReactDataSheet from 'react-datasheet';

import { Button } from '@material-ui/core';

interface IProps<A, S> {
  dispatch: Dispatch<A>;
  state: S;
  headings: string[];
  onAddData: () => void;
  onDeleteData: (i: number) => void;
  spreadSheetData: any[][];
}

const DataGroup = <A extends any, S extends any>(props: IProps<A, S> & { children?: ReactNode }) => {
  const { dispatch, headings, state, onDeleteData, onAddData, spreadSheetData } = props;
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={onAddData}
      >
        Add
      </Button>

      <ReactDataSheet<any, any> data={spreadSheetData}
        valueRenderer={(cell) => cell.value}
        sheetRenderer={(props) => (
          <table className={props.className}>
            <thead>
              <tr>
                <th className="action-cell">Bin</th>
                {
                  headings.map((label, i) => (<th key={label} className="action-cell">
                    {label}
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => onDeleteData(i)}>
                      Delete
                    </Button>
                  </th>))
                }
              </tr>
            </thead>
            <tbody>
              {props.children}
            </tbody>
          </table>
        )}
        onCellsChanged={(changes) => {
          changes.forEach(({ cell, row, col, value }) => {
            if (col === 0) {
              state.data.bins[row] = value;
            } else {
              state.data.counts[col - 1].data[row] = Number(value);
            }
          });
          dispatch({ type: 'setData', data: state.data } as any);
        }} />
    </div>
  )
}

export default DataGroup;
