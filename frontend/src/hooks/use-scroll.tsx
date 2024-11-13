import { useCallback } from "react";

function useScroll() {
  /**
   * @param {number} y @default 0
   * @param {number} x @default 0
   */
  const scrollMainView = useCallback((y = 0, x = 0) => {
    // document && document?.querySelector('body')?.scrollTo(x, y);
    window.scrollTo({
      top: 0,
       behavior: "smooth"
    });
  }, []);
  return { scrollMainView };
}

export default useScroll;
