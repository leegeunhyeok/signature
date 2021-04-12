import { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { debounce } from '../utils';

interface SVGLineProps {
  progress: number;
  color: string;
  d: string;
}

function SVGLine({ progress, color, d }: SVGLineProps) {
  const boxRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);
  const [scale, setScale] = useState(1);

  const updateSizing = useCallback(() => {
    if (!boxRef.current) return;
    const bbox = boxRef.current.getBBox();
    // Update the width and height using the size of the contents
    boxRef.current.setAttribute('width', (bbox.x + bbox.width + bbox.x).toString());
    boxRef.current.setAttribute('height', (bbox.y + bbox.height + bbox.y).toString());

    const targetWidth = document.body.offsetWidth * 0.5;
    const targetHeight = document.body.offsetHeight * 0.3;

    setScale(Math.max(1, Math.min(targetWidth / bbox.width, targetHeight / bbox.height)));
  }, []);

  useEffect(() => {
    if (!lineRef.current) return;
    // Get SVG path's length
    setLength(lineRef.current.getTotalLength() || 0);
    const helper = debounce(() => updateSizing(), 500);
    window.addEventListener('resize', helper.handler);
    updateSizing();

    return () => window.removeEventListener('resize', helper.handler);
  }, [updateSizing]);

  return (
    <ScaleableSVG ref={boxRef} scale={scale}>
      <path
        fill="none"
        strokeWidth="1"
        strokeMiterlimit="0"
        strokeLinecap="round"
        strokeDasharray={`${length} ${length}`}
        strokeDashoffset={(length - length * (progress / 100)).toString()}
        stroke={color}
        d={d}
        ref={lineRef}
      />
    </ScaleableSVG>
  );
}

export default SVGLine;

const ScaleableSVG = styled.svg<{ scale: number }>`
  transform: scale(${(props) => props.scale});
  max-width: 100%;
  transition: transform 300ms;
`;
