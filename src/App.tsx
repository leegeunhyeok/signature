import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SVGLine from './components/SVGLine';
import Slider from './components/Slider';
import { useAnimate } from './hooks/animate';

// Sample path
const d =
  'M40.53 47.2786C32.1619 47.2786 26.7854 65.7273 36.9206 54.2442C45.9786 43.9816 46.5738 40.0014 40.05 59.0461C35.8557 71.2904 29.2988 84.1467 22.0388 94.8061C17.9281 100.841 8.22558 118.106 7.15689 110.882C4.6886 94.1982 53.5306 38.5056 62.6119 28.8079C70.7342 20.1343 79.3088 11.9075 88.035 3.84795C88.9779 2.97706 93.5644 -0.0421782 93.5644 0.000446819C93.5644 8.98963 49.9787 50.3351 42.93 64.3223C41.0585 68.0362 48.1183 57.8196 50.61 54.4898C54.1561 49.751 58.0326 45.5215 61.8825 41.0367C72.5547 28.6043 54.068 56.1585 54.45 56.4079C59.1944 59.5058 71.1728 42.4901 69.0825 47.7567C63.7744 61.1307 12.0625 59.3848 1.87689 54.2442C1.51585 54.062 -0.67191 53.2594 0.206265 52.0804C13.0281 34.8678 93.8374 64.3191 112.766 67.2061';

function App() {
  const [isReady, setReadyState] = useState(false);
  const [isAnimationEnd, setEndState] = useState(false);
  const [progress, setProgress] = useState(0);
  const controller = useAnimate(
    (p) => setProgress(p * 100),
    2000,
    () => setTimeout(() => setEndState(true), 300),
  );

  useEffect(() => {
    setTimeout(() => {
      setReadyState(true);

      setTimeout(() => {
        controller.current.start();
      }, 300);
    }, 500);
  }, [controller]);

  const onProgressChange = (value: number) => {
    controller.current.stop();
    setProgress(value);
  };

  return (
    <AppContainer ready={isReady}>
      <SignBox>
        <SVGLine progress={progress} color="#282c34" d={d} />
      </SignBox>
      <SignTitle show={isAnimationEnd}>My Own Signature</SignTitle>
      {isReady && (
        <FixedMenu>
          <Slider onChange={onProgressChange} value={progress} />
        </FixedMenu>
      )}
    </AppContainer>
  );
}

export default App;

interface AppContainerProps {
  ready: boolean;
}

interface FadeComponent {
  show: boolean;
}

const AppContainer = styled.div<AppContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${(props) => props.ready && 'background-color: #fff'};
  text-align: center;
  transition: background-color 300ms;
  padding: 1rem 2rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const SignBox = styled.div`
  width: 100%;
  height: 20vh;
`;

const SignTitle = styled.p<FadeComponent>`
  font-size: 1.8rem;
  transition: opacity 300ms;
  opacity: ${(props) => (props.show ? '1' : '0')};
`;

const FixedMenu = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  text-align: center;
  box-sizing: border-box;
`;
