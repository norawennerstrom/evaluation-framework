import DenoiserMenu from "./DenoiserMenu";
import { useState, useEffect } from "react";

interface LightFieldViewerProps {
  selectedImage: string;
  selectedDenoiser: string;
  denoisers: string[];
  setSelectedDenoiser: (denoiser: string) => void;
}

const gridSide = 13;

const LightFieldViewer: React.FC<LightFieldViewerProps> = ({
  selectedImage,
  selectedDenoiser,
  denoisers,
  setSelectedDenoiser,
}) => {

  const [view, setView] = useState(85);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          setView((prev) => {
            if (prev % gridSide != 0) {
              return Math.max(prev + 1, 1);
            }
            return prev;
          });
          break;

        case "ArrowRight":
          setView((prev) => {
            if (prev % gridSide != 1) {
              return Math.min(prev - 1, gridSide * gridSide);
            }
            return prev;
          });
          break;

        case "ArrowUp":
          if (view > gridSide) {
            setView((prev) => Math.max(prev - gridSide, 1));
          }
          break;

        case "ArrowDown":
          if (view < gridSide * (gridSide - 1)) {
            setView((prev) => Math.min(prev + gridSide, gridSide * gridSide));
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // ex: https://cdn.jsdelivr.net/gh/norawennerstrom/lf-Bikes/Clean/view_85.webp
  const lightFieldPath =
    "https://cdn.jsdelivr.net/gh/norawennerstrom/lf-" +
    selectedImage +
    "/" +
    selectedDenoiser +
    "/view_" +
    view +
    ".webp";

  return (
    <div className="light-field-viewer">
      <img className="light-field" height={434} src={lightFieldPath} />
      <DenoiserMenu
        denoisers={denoisers}
        setSelectedDenoiser={setSelectedDenoiser}
      />
    </div>
  );
};

export default LightFieldViewer;
