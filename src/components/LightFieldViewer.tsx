import DenoiserMenu from "./DenoiserMenu";
import { forwardRef } from "react"; // forwardref deprecated??
//import preloadViews from "./preloadViews";

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
    const lightFieldPath =
      "https://cdn.jsdelivr.net/gh/norawennerstrom/lf-" +
      selectedLightField +
      "/" +
      selectedDenoiser +
      "/view_" +
      currentView +
      ".webp";

    // useEffect(() => {
    //   preloadViews(selectedLightField, selectedDenoiser);
    // }, [selectedDenoiser, selectedLightField]);

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
