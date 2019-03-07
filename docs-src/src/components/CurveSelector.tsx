import {
  curveBasis,
  curveCardinal,
  curveCatmullRom,
  curveLinear,
  curveMonotoneX,
  curveStep,
  curveStepAfter,
  curveStepBefore,
} from 'd3-shape';
import React, {
  FC,
  useState,
} from 'react';

import {
  MenuItem,
  TextField,
} from '@material-ui/core';

const curves = {
  curveBasis,
  curveCardinal,
  curveCatmullRom,
  curveLinear,
  curveMonotoneX,
  curveStep,
  curveStepAfter,
  curveStepBefore,
};

// export const getCurve

interface IProps {
  onChange: (curve: any) => void;
  value: string;
}
export const CurveSelector: FC<IProps> = ({ onChange, value }) => {
  const [functionName, setFunctionName] = useState('');
  return (
    <TextField
      select
      label="Curve"
      value={functionName === '' ? value : functionName}
      onChange={(e) => {
        setFunctionName(e.target.value);
        onChange(curves[e.target.value]);
      }}
    >
      {Object.keys(curves).map((c) => (
        <MenuItem key={c} value={c}>
          {c}
        </MenuItem>
      ))}
    </TextField>
  );
};
