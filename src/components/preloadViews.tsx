import logPerformance from "./logPerformance";

function preloadViews(
  image: string,
  denoiser: string,
  viewCache: Map<String, HTMLElement>,
  onComplete?: (duration: number) => void
) {
  const start = performance.now();
  const src =
    "https://cdn.jsdelivr.net/gh/norawennerstrom/lf-" +
    image +
    "/" +
    denoiser +
    "/view_";

  let totalToLoad = 13 * 13; // lägg in sidlängden som en environment-variabel?
  let loadCount = 0;

  for (let view = 1; view <= 13 * 13; view++) {
    const imgSrc = src + view + ".webp";
    const img = new Image();

    img.onload = () => {
      loadCount++;
      if (loadCount === totalToLoad) {
        const duration = performance.now() - start;
        logPerformance("init", denoiser, duration);

        if (onComplete) {
          onComplete(duration);
        }
      }
    };
    img.src = imgSrc;
    viewCache.set(imgSrc, img);
  }
}
export default preloadViews;
