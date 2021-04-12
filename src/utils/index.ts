/**
 * Reduce repeated function call and improve performance
 *
 * @param callback Call that after debounced
 * @param ms Waiting time
 * @returns { handler: () => void } Callback
 */
export const debounce = (callback: () => void, ms: number) => {
  let timer = 0;
  return {
    handler() {
      clearTimeout(timer);
      timer = window.setTimeout(callback, ms);
    },
  };
};
