import logPerformance from "./logPerformance";
import { GRID_SIDE } from "../constants";

function preloadViews(
  image: string,
  denoiser: string,
  onComplete?: (duration: string) => void
) {
  const start = performance.now();
  const src =
    "https://cdn.jsdelivr.net/gh/norawennerstrom/lf-" +
    image +
    "/" +
    denoiser +
    "/view_";

  let totalToLoad = GRID_SIDE * GRID_SIDE;
  let loadCount = 0;

  for (let view = 1; view <= totalToLoad; view++) {
    const imgSrc = src + view + ".webp";
    const img = new Image();

    img.onload = () => {
      loadCount++;
      if (loadCount === totalToLoad) {
        const duration = (performance.now() - start).toFixed(6);
        logPerformance("init", denoiser, duration);

        if (onComplete) {
          onComplete(duration);
        }
      }
    };
    img.src = imgSrc;
  }
}
export default preloadViews;
