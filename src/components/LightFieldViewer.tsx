import DenoiserMenu from "./DenoiserMenu";
import { useEffect, useRef, forwardRef } from "react"; // forwardref deprecated??

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
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
      const lightFieldPath =
        "https://cdn.jsdelivr.net/gh/norawennerstrom/lf-" +
        selectedLightField +
        "/" +
        selectedDenoiser +
        "/view_" +
        currentView +
        ".webp";

      const canvas = canvasRef.current;
      if (canvas && imgRef && typeof imgRef !== "function") {
        const ctx = canvas.getContext("2d");
        const img = new Image();
        imgRef.current = img;

        img.addEventListener("load", () => {
          ctx?.clearRect(0, 0, canvas.width, canvas.height);
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        });

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
