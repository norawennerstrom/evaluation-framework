import { useRef, useState, useEffect } from "react";

export function prioritizedPreload(
  selectedLightField: string,
  selectedDenoiser: string,
  secondSelectedDenoiser: string
) {
  // function for handling the stack of images to load

  // ref for the stack containing views to preload
  const stack = useRef<number[]>([]);
  // state variable for the view currently displayed (default: 85 (center))
  const [currentView, setCurrentView] = useState<number>(85);
  // ref for checking if the ProcessStack function is currently running
  const processing = useRef(false);
  // ref for keeping track of which views have been loaded
  const loadedViews = useRef<Set<number>>(new Set());

  // if the requested image set changes, clear loadedViews
  useEffect(() => {
    loadedViews.current.clear();
  }, [selectedLightField, selectedDenoiser]);

  const addViewRequest = (req: number, neighbors: number[]) => {
    // function for adding the requested view and its neighbors to the stack
    // will not add views which have already been loaded

    const toPush: number[] = [];

    for (let n of neighbors) {
      if (!loadedViews.current.has(n)) {
        toPush.push(n);
      }
    }

    if (!loadedViews.current.has(req)) {
      toPush.push(req);
    }

    stack.current.push(...toPush);
    setCurrentView(req);
    processStack();
  };

  // function for popping from the stack and loading the associated image
  // async function used for promise-based behavior with await
  const processStack = async () => {
    if (processing.current) return;
    processing.current = true;

    while (stack.current.length > 0) {
      const item = stack.current.pop();
      if (!item || loadedViews.current.has(item)) continue;

      // the image to the left is always loaded before the image to the right
      await loadView(item, selectedLightField, selectedDenoiser);
      if (secondSelectedDenoiser) {
        await loadView(item, selectedLightField, secondSelectedDenoiser);
      }
      loadedViews.current.add(item);
    }

    processing.current = false;
  };

  return {
    currentView,
    addViewRequest,
    isViewLoaded: (view: number) => loadedViews.current.has(view),
  };
}

function loadView(
  view: number,
  selectedLightField: string,
  selectedDenoiser: string
): Promise<void> {
  // load the requested image
  // return Promise to allow keyword 'await' on function call
  return new Promise((resolve) => {
    const img = new Image();
    const url =
      "https://cdn.jsdelivr.net/gh/norawennerstrom/lf-" +
      selectedLightField +
      "/" +
      selectedDenoiser +
      "/view_" +
      view +
      ".webp";
    img.src = url;
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });
}
