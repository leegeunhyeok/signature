import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface SVGLineProps {
  progress: number;
  color: string;
  d: string;
}

function SVGLine({ progress, color, d }: SVGLineProps) {
  const ref = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);

  useEffect(() => {
    // Get SVG path's length
    setLength(ref.current?.getTotalLength() || 0);
  }, []);

  return (
    <ScaleableSVG width={160} height={62}>
      <path
        fill="none"
        strokeWidth="1"
        strokeMiterlimit="0"
        strokeLinecap="round"
        strokeDasharray={`${length} ${length}`}
        strokeDashoffset={(length - length * (progress / 100)).toString()}
        ref={ref}
        stroke={color}
        d={d}
      />
    </ScaleableSVG>
  );
}

export default SVGLine;

const ScaleableSVG = styled.svg`
  width: 100%;
`;
