import { useEffect } from "react";

export enum WindowSizeEnum {
  SMALL = "small",
  LARGE = "large",
}

export type Dimensions = {
  height: number;
  width: number;
};

export default function useWindowResize(
  handleDimensionChange: (dimensions: Dimensions) => void
) {
  useEffect(() => {
    function handleResize() {
      handleDimensionChange({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
}
