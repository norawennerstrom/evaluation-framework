import LightFieldViewer from "./LightFieldViewer";
import logPerformance from "./logPerformance";
import { useEffect, useRef, useState } from "react";
import { GRID_SIDE } from "../constants.ts";

interface BodyProps {
  selectedLightField: string;
  isDualView: boolean;
}

const Body: React.FC<BodyProps> = ({ selectedLightField, isDualView }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const secondImgRef = useRef<HTMLImageElement | null>(null);
  const [selectedDenoiser, setSelectedDenoiser] = useState("Clean");
  const [currentView, setCurrentView] = useState<number>(85);
  const [secondSelectedDenoiser, setSecondSelectedDenoiser] =
    useState("SwinIR");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const start = performance.now(); // start timer
      const updateView = () => {
        const img = imgRef.current;
        if (img?.complete) {
          const duration = (performance.now() - start).toFixed(6);
          logPerformance("nav", selectedDenoiser, duration);
        } else {
          img?.addEventListener(
            "load",
            () => {
              const duration = (performance.now() - start).toFixed(6);
              logPerformance("nav", selectedDenoiser, duration);
            },
            { once: true }
          );
        }

        const secondImg = secondImgRef.current;
        if (secondImg?.complete) {
          const duration = (performance.now() - start).toFixed(6);
          logPerformance("nav", secondSelectedDenoiser, duration);
        } else {
          secondImg?.addEventListener(
            "load",
            () => {
              const duration = (performance.now() - start).toFixed(6);
              logPerformance("nav", secondSelectedDenoiser, duration);
            },
            { once: true }
          );
        }
      };

      switch (event.key) {
        case "ArrowLeft":
          setCurrentView((prev) => {
            const newView = prev % GRID_SIDE !== 0 ? prev + 1 : prev;
            setTimeout(updateView, 0);
            return newView;
          });
          break;

        case "ArrowRight":
          setCurrentView((prev) => {
            const newView = prev % GRID_SIDE !== 1 ? prev - 1 : prev;
            setTimeout(updateView, 0);
            return newView;
          });
          break;

        case "ArrowUp":
          setCurrentView((prev) => {
            const newView = prev - GRID_SIDE > 0 ? prev - GRID_SIDE : prev;
            setTimeout(updateView, 0);
            return newView;
          });
          break;

        case "ArrowDown":
          setCurrentView((prev) => {
            const newView =
              prev + GRID_SIDE <= GRID_SIDE * GRID_SIDE
                ? prev + GRID_SIDE
                : prev;
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
  }, [
    selectedDenoiser,
    secondSelectedDenoiser,
    selectedLightField,
    currentView,
  ]);
  return (
    <div className="body">
      <LightFieldViewer
        selectedLightField={selectedLightField}
        selectedDenoiser={selectedDenoiser}
        currentView={currentView}
        setSelectedDenoiser={setSelectedDenoiser}
        ref={imgRef}
      />
      {isDualView && (
        <LightFieldViewer
          selectedLightField={selectedLightField}
          selectedDenoiser={secondSelectedDenoiser}
          currentView={currentView}
          setSelectedDenoiser={setSecondSelectedDenoiser}
          ref={secondImgRef}
        />
      )}
    </div>
  );
};
export default Body;
