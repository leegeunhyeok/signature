import { useRef, useState } from 'react';
import styled from 'styled-components';

interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  onChange(value: number): void;
}

const LINE_SIZE = 10;
const THUMB_SIZE = 20;

function Slider({ value, min, max, onChange }: SliderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [holding, setHoldState] = useState(false);

  const moveHandler = (event: React.MouseEvent | React.TouchEvent) => {
    if (!ref.current || !holding) return;
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const newValue = ((clientX - THUMB_SIZE) / ref.current.clientWidth) * 100;
    onChange(Math.min(Math.max(min ?? 0, newValue), max ?? 0));
  };

  return (
    <SliderContainer
      ref={ref}
      onClick={moveHandler}
      onMouseDown={() => setHoldState(true)}
      onMouseUp={() => setHoldState(false)}
      onMouseMove={moveHandler}
      onTouchStart={() => setHoldState(true)}
      onTouchEnd={() => setHoldState(false)}
      onTouchMove={moveHandler}
    >
      <SliderBar value={value} />
      <SliderThumb value={value} />
    </SliderContainer>
  );
}

export default Slider;

interface SliderValue {
  value: number;
}

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${LINE_SIZE}px;
  background-color: #eee;
  border-radius: ${LINE_SIZE}px;
`;

const SliderBar = styled.div<SliderValue>`
  position: absolute;
  left: 0;
  width: ${(props) => props.value}%;
  height: 100%;
  background-color: #282c34;
  border-radius: ${LINE_SIZE}px 0 0 ${LINE_SIZE}px;
  pointer-events: none;
`;

const SliderThumb = styled.span<SliderValue>`
  position: absolute;
  display: block;
  border-radius: 50%;
  background-color: #282c34;
  width: ${THUMB_SIZE}px;
  height: ${THUMB_SIZE}px;
  left: ${(props) => props.value}%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;
