import { useRef, useState, useEffect } from "react";

export function prioritizedPreload(
  selectedLightField: string,
  selectedDenoiser: string,
  secondSelectedDenoiser: string
) {
  const stack = useRef<number[]>([]);
  const [currentView, setCurrentView] = useState<number>(85);
  const processing = useRef(false);
  const loadedViews = useRef<Set<number>>(new Set());

  useEffect(() => {
    loadedViews.current.clear();
  }, [selectedLightField, selectedDenoiser]);

  const addViewRequest = (req: number, neighbors: number[]) => {
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

  const processStack = async () => {
    if (processing.current) return;
    processing.current = true;

    while (stack.current.length > 0) {
      const item = stack.current.pop();
      if (!item || loadedViews.current.has(item)) continue;

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
