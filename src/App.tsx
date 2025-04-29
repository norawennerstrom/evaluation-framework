import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import preloadViews from "./components/preloadViews";
import fetchFromAPI from "./components/fetchFromAPI";

const cache = new Map<String, HTMLElement>();
const secondCache = new Map<String, HTMLElement>();

function App() {
  // load image sets
  const [lightFields, setImages] = useState([]);
  const [selectedLightField, setSelectedLightField] = useState("Bikes");
  fetchFromAPI("lightFields", setImages);

  // load denoisers
  const [denoisers, setDenoisers] = useState([]);
  const [selectedDenoiser, setSelectedDenoiser] = useState("Clean");
  const [secondSelectedDenoiser, setSecondSelectedDenoiser] = useState("Clean");
  fetchFromAPI("denoisers", setDenoisers);

  const [isDualView, setIsDualView] = useState<boolean>(false);

  // typ samma sak två gånger?
  useEffect(() => {
    cache.clear();
    if (selectedLightField && selectedDenoiser) {
      preloadViews(selectedLightField, selectedDenoiser, cache);
    }
  }, [selectedLightField, selectedDenoiser]);

  useEffect(() => {
    secondCache.clear();
    if (selectedLightField && secondSelectedDenoiser) {
      preloadViews(selectedLightField, secondSelectedDenoiser, secondCache);
    }
  }, [selectedLightField, secondSelectedDenoiser]);

  return (
    <>
      <Header
        lightFields={lightFields}
        setSelectedLightField={setSelectedLightField}
        setIsDualView={setIsDualView}
        isDualView={isDualView}
      />
      <Body
        selectedLightField={selectedLightField}
        selectedDenoiser={selectedDenoiser}
        secondSelectedDenoiser={secondSelectedDenoiser}
        denoisers={denoisers}
        setSelectedDenoiser={setSelectedDenoiser}
        setSecondSelectedDenoiser={setSecondSelectedDenoiser}
        isDualView={isDualView}
      />
    </>
  );
}

export default App;
