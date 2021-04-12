import { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';

interface SVGLineProps {
  progress: number;
  color: string;
  d: string;
}

function SVGLine({ progress, color, d }: SVGLineProps) {
  const boxRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);
  const [pathScale, setScale] = useState(1);

  // Fit line path to SVG container
  const updateSizing = useCallback(() => {
    if (!lineRef.current || !boxRef.current) return;
    const boxWidth = boxRef.current.getBoundingClientRect().width;
    const lineWidth = lineRef.current.getBBox().width;
    setScale(boxWidth / lineWidth);
  }, []);

  useEffect(() => {
    if (!lineRef.current) return;
    // Get SVG path's length
    setLength(lineRef.current.getTotalLength() || 0);
    window.addEventListener('resize', updateSizing);
    updateSizing();

    return () => window.removeEventListener('resize', updateSizing);
  }, [updateSizing]);

  return (
    <SVGContainer ref={boxRef}>
      <ScaleablePath
        fill="none"
        strokeWidth="1"
        strokeMiterlimit="0"
        strokeLinecap="round"
        strokeDasharray={`${length} ${length}`}
        strokeDashoffset={(length - length * (progress / 100)).toString()}
        stroke={color}
        scale={pathScale}
        d={d}
        ref={lineRef}
      />
    </SVGContainer>
  );
}

export default SVGLine;

const SVGContainer = styled.svg`
  width: 100%;
  height: 30vh;
`;

const ScaleablePath = styled.path<{ scale: number }>`
  ${(props) => `transform: scale(${props.scale})`};
  transition: transform 300ms;
`;
