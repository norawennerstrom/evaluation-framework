import LightFieldViewer from "./LightFieldViewer";
import logPerformance from "./logPerformance";
import { prioritizedPreload } from "./prioritizedPreload";
import { useEffect, useRef, useState } from "react";
import { GRID_SIDE } from "../constants.ts";

interface BodyProps {
  selectedLightField: string;
  isDualView: boolean;
}

function getUpper(view: number): [number, boolean] {
  // returns the calculated number for the upper neighbor of view
  // isValid is true if the calculated neighbor exists
  const upperNeighbor = view - GRID_SIDE;
  const isValid = upperNeighbor > 0;
  return [upperNeighbor, isValid];
}

function getLower(view: number): [number, boolean] {
  const lowerNeighbor = view + GRID_SIDE;
  const isValid = lowerNeighbor <= GRID_SIDE * GRID_SIDE;
  return [lowerNeighbor, isValid];
}

function getRight(view: number): [number, boolean] {
  const rightNeighbor = view - 1;
  const isValid = rightNeighbor % GRID_SIDE !== 0;
  return [rightNeighbor, isValid];
}

function getLeft(view: number): [number, boolean] {
  const leftNeighbor = view + 1;
  const isValid = leftNeighbor % GRID_SIDE !== 1;
  return [leftNeighbor, isValid];
}

function getRowAndColumn(view: number) {
  // returns the numbers for all of the views in the same column and row as view
  // ordered by distance from view, where the farthest views come first

  let rowAndColumn = [];
  // variables for determining when the edges of the grid are reached
  let remainingUpper, remainingLower, remainingRight, remainingLeft;
  remainingUpper = remainingLower = remainingRight = remainingLeft = true;
  // variables for keeping track of the latest added view in each direction
  let upper, lower, right, left;
  upper = lower = right = left = view;

  // add views in each direction until the edges of the grid have been reached
  while (remainingUpper || remainingLower || remainingRight || remainingLeft) {
    if (remainingUpper) {
      [upper, remainingUpper] = getUpper(upper);
      if (remainingUpper) {
        rowAndColumn.push(upper);
      }
    }
    if (remainingLower) {
      [lower, remainingLower] = getLower(lower);
      if (remainingLower) {
        rowAndColumn.push(lower);
      }
    }
    if (remainingRight) {
      [right, remainingRight] = getRight(right);
      if (remainingRight) {
        rowAndColumn.push(right);
      }
    }
    if (remainingLeft) {
      [left, remainingLeft] = getLeft(left);
      if (remainingLeft) {
        rowAndColumn.push(left);
      }
    }
  }

  // reverse the array to put the closest views last
  return rowAndColumn.reverse();
}

const Body: React.FC<BodyProps> = ({ selectedLightField, isDualView }) => {
  // component containing the body of the app

  // ref for the displayed image(s)
  const imgRef = useRef<HTMLImageElement | null>(null);
  const secondImgRef = useRef<HTMLImageElement | null>(null);
  // state variables for displayed denoiser(s) and view (default: Clean and SwinIR, view 85 (center))
  const [selectedDenoiser, setSelectedDenoiser] = useState("Clean");
  const [secondSelectedDenoiser, setSecondSelectedDenoiser] =
    useState("SwinIR");

  // call prioritizedPreload to initialize and access state variable currentView and function addViewRequest
  const { currentView, addViewRequest } = prioritizedPreload(
    selectedLightField,
    selectedDenoiser,
    secondSelectedDenoiser
  );

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
          if (currentView) {
            // switch view one step to the left unless the end of the field is already reached
            const newView =
              currentView % GRID_SIDE !== 0 ? currentView + 1 : currentView;
            // call measureLoadTime after currentView is updated
            setTimeout(measureLoadTime, 0);

            // add requests for the new view and the rest of the views in the same row and column
            const rowAndColumn = getRowAndColumn(newView);
            addViewRequest(newView, rowAndColumn);
          }
          break;

        case "ArrowRight":
          if (currentView) {
            const newView =
              currentView % GRID_SIDE !== 1 ? currentView - 1 : currentView;
            setTimeout(measureLoadTime, 0);
            const rowAndColumn = getRowAndColumn(newView);
            addViewRequest(newView, rowAndColumn);
          }
          break;

        case "ArrowUp":
          if (currentView) {
            const newView =
              currentView - GRID_SIDE > 0
                ? currentView - GRID_SIDE
                : currentView;
            setTimeout(measureLoadTime, 0);
            const rowAndColumn = getRowAndColumn(newView);
            addViewRequest(newView, rowAndColumn);
          }
          break;

        case "ArrowDown":
          if (currentView) {
            const newView =
              currentView + GRID_SIDE <= GRID_SIDE * GRID_SIDE
                ? currentView + GRID_SIDE
                : currentView;
            setTimeout(measureLoadTime, 0);
            const rowAndColumn = getRowAndColumn(newView);
            addViewRequest(newView, rowAndColumn);
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
