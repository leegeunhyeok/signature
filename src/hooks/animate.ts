import { useRef } from 'react';

export const useAnimate = (
  callback: (progress: number) => void,
  ms: number,
  endCallback?: () => void,
) => {
  const state = {
    startedAt: 0,
    interval: -1,
    exited: false,
  };

  // Timing function
  const timing = (x: number) => {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  };

  // Get animation progress
  const progress = () => timing(Math.min((+new Date() - state.startedAt) / ms, 1));

  // Loop for animation ticks
  const frame = () => {
    const value = progress();
    if (value < 1) {
      state.interval = requestAnimationFrame(() => {
        callback(value);
        state.exited || frame();
      });
    } else {
      stop();
      callback(progress());
    }
  };

  const start = () => {
    if (state.startedAt !== 0) return;
    state.exited = false;
    state.startedAt = +new Date();
    frame();
  };

  const stop = () => {
    state.exited = true;
    state.startedAt = 0;
    cancelAnimationFrame(state.interval);
    endCallback && endCallback();
  };

  return useRef({ start, stop });
};
