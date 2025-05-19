import DenoiserMenu from "./DenoiserMenu";
import { useEffect, useRef, forwardRef } from "react";
// import preloadViews from "./preloadViews";

type LightFieldViewerProps = {
  selectedLightField: string;
  selectedDenoiser: string;
  currentView: number;
  setSelectedDenoiser: (denoiser: string) => void;
};

const LightFieldViewer = forwardRef<HTMLImageElement, LightFieldViewerProps>(
  (
    { selectedLightField, selectedDenoiser, currentView, setSelectedDenoiser },
    imgRef
  ) => {
    // component containing the light field viewer

    // ref to the canvas element (used for updating displayed image)
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // effect hook for preloading the full field when the options in the selects change
    // useEffect(() => {
    //   preloadViews(selectedLightField, selectedDenoiser);
    // }, [selectedDenoiser, selectedLightField]);

    // effect hook for updating the canvas when a new image is requested
    useEffect(() => {
      // path to the currently requested image (CDN)
      const lightFieldPath =
        "https://cdn.jsdelivr.net/gh/norawennerstrom/lf-" +
        selectedLightField +
        "/" +
        selectedDenoiser +
        "/view_" +
        currentView +
        ".webp";
      // path to the currently requested image (local)
      // const lightFieldPath =
      //   "/~nowe2200/kandidatarbete/dist/" +
      //   selectedLightField +
      //   "/" +
      //   selectedDenoiser +
      //   "/view_" +
      //   currentView +
      //   ".webp";

      const canvas = canvasRef.current;
      if (canvas && imgRef && typeof imgRef !== "function") {
        const ctx = canvas.getContext("2d");
        const img = new Image();
        imgRef.current = img;

        // once the new image is loaded, draw it!
        img.addEventListener("load", () => {
          ctx?.clearRect(0, 0, canvas.width, canvas.height);
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        });
        // update path to the image
        img.src = lightFieldPath;
      }
    }, [currentView, selectedDenoiser, selectedLightField]);

    return (
      <div className="light-field-viewer">
        <canvas
          className="light-field"
          ref={canvasRef}
          height="434"
          width="625"
        ></canvas>
        <DenoiserMenu
          setSelectedDenoiser={setSelectedDenoiser}
          selectedDenoiser={selectedDenoiser}
        />
      </div>
    );
  }
);

export default LightFieldViewer;
