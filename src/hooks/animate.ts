import { useRef } from 'react';

export const useAnimate = (callback: (progress: number) => void, ms: number) => {
  const state = {
    startedAt: 0,
    interval: -1,
    exited: false,
  };

  // Get animation progress
  const progress = () => Math.min((+new Date() - state.startedAt) / ms, 1);

  // Loop for animation ticks
  const frame = () => {
    const value = progress();
    if (value < 1) {
      state.interval = requestAnimationFrame(() => {
        callback(value);
        state.exited || frame();
      });
    } else {
      state.startedAt = 0;
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
  };

  return useRef({ start, stop });
};
