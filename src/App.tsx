import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SVGLine from './components/SVGLine';
import { useAnimate } from './hooks/animate';

// Sample path
const d =
  'M58.08 0C58.08 18.1895 15.157 35.7824 5.76 50.4C3.51545 53.8915 0 61.44 0 61.44C0 61.44 2.50927 57.5652 3.84 55.68C8.74496 48.7313 35.1275 30.5238 45.12 35.52C51.4037 38.6619 30.663 59.6055 34.56 53.76C45.5122 37.3317 66.5673 45.8812 80.16 39.84C88.3709 36.1907 95.1862 31.8863 102.24 26.4C104.474 24.6621 106.478 18.6384 108.48 20.64C110.983 23.1433 106.781 30.2926 116.64 32.64C129.467 35.6941 139.852 32.9902 151.2 26.88C151.598 26.6654 152.48 25.6 152.16 25.92C148.645 29.4346 166.141 34.4988 168.96 31.68';

function App() {
  const [isReady, setReadyState] = useState(false);
  const [progress, setProgress] = useState(0);
  const controller = useAnimate((p) => {
    setProgress(p);
  }, 2000);

  useEffect(() => {
    setTimeout(() => setReadyState(true), 500);
  }, []);

  return (
    <AppContainer ready={isReady}>
      <SVGLine progress={progress * 100} color="#282c34" d={d} />
      <AppHeader>{progress}</AppHeader>
      <button onClick={controller.current.start}>Start</button>
      <button onClick={controller.current.stop}>Stop</button>
    </AppContainer>
  );
}

export default App;

interface AppContainerProps {
  ready: boolean;
}

const AppContainer = styled.div<AppContainerProps>`
  ${(props) => props.ready && 'background-color: #fff'};
  text-align: center;
  transition: background-color 300ms;
`;

const AppHeader = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`;
