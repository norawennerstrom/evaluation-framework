import DenoiserMenu from "./DenoiserMenu";
import { useEffect, forwardRef } from "react";
import preloadViews from "./preloadViews";

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

    // path to the currently requested image
    const lightFieldPath =
      "https://cdn.jsdelivr.net/gh/norawennerstrom/lf-" +
      selectedLightField +
      "/" +
      selectedDenoiser +
      "/view_" +
      currentView +
      ".webp";

    // effect hook for preloading the full field when the options in the selects change
    useEffect(() => {
      preloadViews(selectedLightField, selectedDenoiser);
    }, [selectedDenoiser, selectedLightField]);

    return (
      <div className="light-field-viewer">
        <img
          className="light-field"
          height={434}
          ref={imgRef}
          src={lightFieldPath}
        />
        <DenoiserMenu
          setSelectedDenoiser={setSelectedDenoiser}
          selectedDenoiser={selectedDenoiser}
        />
      </div>
    );
  }
);

export default LightFieldViewer;
