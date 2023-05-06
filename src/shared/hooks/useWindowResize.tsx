import { useEffect } from "react";

export enum WindowSizeEnum {
  SMALL = "small",
  LARGE = "large",
}

export default function useWindowResize(
  handleDimensionChange: (dimensions: any) => void
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
