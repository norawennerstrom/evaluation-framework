import LightFieldViewer from "./LightFieldViewer";
import logPerformance from "./logPerformance";
import { useEffect, useRef, useState } from "react";
import { GRID_SIDE } from "../constants.ts";

interface BodyProps {
  selectedLightField: string;
  isDualView: boolean;
}

const Body: React.FC<BodyProps> = ({ selectedLightField, isDualView }) => {
  // component containing the body of the app

  // ref for the displayed image(s)
  const imgRef = useRef<HTMLImageElement | null>(null);
  const secondImgRef = useRef<HTMLImageElement | null>(null);
  // state variables for displayed denoiser(s) and view (default: Clean and SwinIR, view 85 (center))
  const [selectedDenoiser, setSelectedDenoiser] = useState("Clean");
  const [currentView, setCurrentView] = useState<number>(85);
  const [secondSelectedDenoiser, setSecondSelectedDenoiser] =
    useState("SwinIR");

  // effect hook for adding event listener for keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const start = performance.now(); // start timer at button click

      const measureLoadTime = () => {
        // function for detecting when the displayed images are loaded and logging the time
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
            // switch view one step to the left unless the end of the field is already reached
            const newView = prev % GRID_SIDE !== 0 ? prev + 1 : prev;
            // call measureLoadTime after currentView is updated
            setTimeout(measureLoadTime, 0);
            return newView;
          });
          break;

        case "ArrowRight":
          setCurrentView((prev) => {
            const newView = prev % GRID_SIDE !== 1 ? prev - 1 : prev;
            setTimeout(measureLoadTime, 0);
            return newView;
          });
          break;

        case "ArrowUp":
          setCurrentView((prev) => {
            const newView = prev - GRID_SIDE > 0 ? prev - GRID_SIDE : prev;
            setTimeout(measureLoadTime, 0);
            return newView;
          });
          break;

        case "ArrowDown":
          setCurrentView((prev) => {
            const newView =
              prev + GRID_SIDE <= GRID_SIDE * GRID_SIDE
                ? prev + GRID_SIDE
                : prev;
            setTimeout(measureLoadTime, 0);
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
      <div className="view-index">
        <p>Current view:</p>
        <p className="view-nr">{currentView}</p>
      </div>
      <div className="lf-viewers">
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
    </div>
  );
};
export default Body;
