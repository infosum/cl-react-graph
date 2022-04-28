import React, { FC } from 'react';

interface Props {
  width?: string;
  height?: string;
};

export const InfoSumIdent: FC<Props> = (props) => {
  return (
    <svg role="img"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 35 35">
      <g>
        <path fill="hsla(208, 69%, 66%, 1)" d="M28.48,10.92H24.09V6.79A6.6,6.6,0,0,0,17.51.21h0a6.6,6.6,0,0,0-6.57,6.58v4.13h4.42a8.76,8.76,0,0,1,8.76,8.76v4.4h4.36a6.6,6.6,0,0,0,6.57-6.58h0A6.6,6.6,0,0,0,28.48,10.92Z" />
        <path fill="hsla(29, 92%, 57%, 1)" d="M19.7,24.08a8.76,8.76,0,0,1-8.76-8.76v-4.4H6.58A6.6,6.6,0,0,0,0,17.5H0a6.6,6.6,0,0,0,6.58,6.58H11v4.13a6.6,6.6,0,0,0,6.58,6.58h0a6.6,6.6,0,0,0,6.58-6.58V24.08H19.7Z" />
        <path fill="hsla(216, 60%, 18%, 1)" d="M15.36,10.92H10.94v4.4a8.76,8.76,0,0,0,8.76,8.76h4.42v-4.4A8.76,8.76,0,0,0,15.36,10.92Z" />
      </g>
    </svg>
  );
};

InfoSumIdent.defaultProps = {
  height: '35',
  width: '35',
};

export default InfoSumIdent;
