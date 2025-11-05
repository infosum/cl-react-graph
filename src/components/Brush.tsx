import React, {
  PropsWithChildren,
  ReactNode,
  useState,
} from 'react';
import { useDrag } from 'react-use-gesture';

import { animated } from '@react-spring/web';

type Position = {
  start: number;
  end: number;
};

type Props = {
  width: number;
  height: number;
  brushWidth: number;
  top?: number;
  left?: number;
  chart: () => ReactNode;
  initialPosition?: Position;
  onChange?: ({ start, end }: Position) => void;
};

type ContainerProps = {
  width: number;
  height: number;
};

const Container = ({
  children,
  height,
  width,
}: PropsWithChildren<ContainerProps>) => (
  <rect width={width} height={height} fill="#eee">
    {children}
  </rect>
);

// @TODO resize handles...
export const Brush = ({
  onChange,
  brushWidth,
  width,
  height,
  top = 0,
  left = 0,
  chart,
  initialPosition,
}: Props) => {
  const start = initialPosition
    ? { x: initialPosition.start, y: 0, w: brushWidth }
    : { x: 0, y: 0, w: brushWidth };

  const [{ x, y, w }, set] = useState(start);

  // Set the drag hook and define component movement based on gesture data
  const bounds = { top: 0, bottom: height, left: 0, right: width - w };

  const bind = useDrag(
    ({ movement: [mx, my] }) => {
      onChange && onChange({ start: mx, end: mx + w });
      set({ x: mx, y: 0, w });
    },
    {
      initial: () => [x, y],
      bounds,
    },
  );

  const bindResizeLeft = useDrag(
    (props) => {
      const width =
        props._lastEventType === "mousemove" ? w - props.delta[0] : w;
      set({ x: props.movement[0], y, w: width });
      onChange && onChange({ start: props.movement[0], end: y + width });
    },
    {
      initial: () => [x, y],
      bounds,
    },
  );

  const bindResizeRight = useDrag(
    (props) => {
      const width =
        props._lastEventType === "mousemove" ? w + props.delta[0] : w;
      set({ x, y, w: width });
      onChange && onChange({ start: x, end: y + width });
    },
    {
      initial: () => [x, y],
      bounds,
    },
  );

  return (
    <g transform={`translate(${left}, ${top})`}>
      <Container width={width} height={height}></Container>
      {chart()}

      <animated.rect
        width={w}
        height={height}
        fill="#aaeeff"
        {...bind()}
        style={
          {
            cursor: "move",
            opacity: 0.5,
            x,
            y,
          } as any
        }
      ></animated.rect>
      <animated.rect
        {...bindResizeLeft()}
        width={10}
        height={height}
        style={
          {
            x: x,
            opacity: 0,
            cursor: "w-resize",
            y,
          } as any
        }
      ></animated.rect>
      <animated.rect
        {...bindResizeRight()}
        width={10}
        height={height}
        style={
          {
            x: x + w,
            opacity: 0,
            cursor: "e-resize",
            y,
          } as any
        }
      ></animated.rect>
    </g>
  );
};
