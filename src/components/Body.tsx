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
  let rowAndColumn = [];
  let remainingUpper, remainingLower, remainingRight, remainingLeft;
  remainingUpper = remainingLower = remainingRight = remainingLeft = true;
  let upper, lower, right, left;
  upper = lower = right = left = view;

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

  return rowAndColumn.reverse();
}

const Body: React.FC<BodyProps> = ({ selectedLightField, isDualView }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const secondImgRef = useRef<HTMLImageElement | null>(null);
  const [selectedDenoiser, setSelectedDenoiser] = useState("Clean");
  const [secondSelectedDenoiser, setSecondSelectedDenoiser] =
    useState("SwinIR");
  const { currentView, addViewRequest } = prioritizedPreload(
    selectedLightField,
    selectedDenoiser,
    secondSelectedDenoiser
  );

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
          if (currentView) {
            const newView =
              currentView % GRID_SIDE !== 0 ? currentView + 1 : currentView;
            setTimeout(updateView, 0);
            const neighbors = getRowAndColumn(newView);
            addViewRequest(newView, neighbors);
          }
          break;

        case "ArrowRight":
          if (currentView) {
            const newView =
              currentView % GRID_SIDE !== 1 ? currentView - 1 : currentView;
            setTimeout(updateView, 0);
            const neighbors = getRowAndColumn(newView);
            addViewRequest(newView, neighbors);
          }
          break;

        case "ArrowUp":
          if (currentView) {
            const newView =
              currentView - GRID_SIDE > 0
                ? currentView - GRID_SIDE
                : currentView;
            setTimeout(updateView, 0);
            const neighbors = getRowAndColumn(newView);
            addViewRequest(newView, neighbors);
          }
          break;

        case "ArrowDown":
          if (currentView) {
            const newView =
              currentView + GRID_SIDE <= GRID_SIDE * GRID_SIDE
                ? currentView + GRID_SIDE
                : currentView;
            setTimeout(updateView, 0);
            const neighbors = getRowAndColumn(newView);
            addViewRequest(newView, neighbors);
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
