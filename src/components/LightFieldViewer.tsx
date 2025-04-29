import DenoiserMenu from "./DenoiserMenu";
import logPerformance from "./logPerformance";
import { useState, useEffect } from "react";

interface LightFieldViewerProps {
  selectedLightField: string;
  selectedDenoiser: string;
  denoisers: string[];
  setSelectedDenoiser: (denoiser: string) => void;
}

const gridSide = 13;

const LightFieldViewer: React.FC<LightFieldViewerProps> = ({
  selectedLightField,
  selectedDenoiser,
  denoisers,
  setSelectedDenoiser,
}) => {
  const [view, setView] = useState(85);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const start = performance.now(); // measure response time
      const updateView = () => {
        const img = document.querySelector(
          "img.light-field"
        ) as HTMLImageElement;
        if (img?.complete) {
          const duration = performance.now() - start;
          logPerformance("nav", selectedDenoiser, duration);
        } else {
          img?.addEventListener(
            "load",
            () => {
              const duration = performance.now() - start;
              logPerformance("nav", selectedDenoiser, duration);
            },
            { once: true }
          );
        }
      };

      switch (event.key) {
        case "ArrowLeft":
          setView((prev) => {
            const newView = prev % gridSide !== 0 ? prev + 1 : prev;
            setTimeout(updateView, 0);
            return newView;
          });
          break;

        case "ArrowRight":
          setView((prev) => {
            const newView = prev % gridSide !== 1 ? prev - 1 : prev;
            setTimeout(updateView, 0);
            return newView;
          });
          break;

        case "ArrowUp":
          setView((prev) => {
            const newView = prev - gridSide > 0 ? prev - gridSide : prev;
            setTimeout(updateView, 0);
            return newView;
          });
          break;

        case "ArrowDown":
          setView((prev) => {
            const newView =
              prev + gridSide <= gridSide * gridSide ? prev + gridSide : prev;
            setTimeout(updateView, 0);
            return newView;
          });
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedDenoiser]);

  // ex: https://cdn.jsdelivr.net/gh/norawennerstrom/lf-Bikes/Clean/view_85.webp
  const lightFieldPath =
    "https://cdn.jsdelivr.net/gh/norawennerstrom/lf-" +
    selectedLightField +
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
