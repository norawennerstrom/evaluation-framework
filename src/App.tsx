import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Body from "./components/Body";

function fetchFromAPI(endpoint: string, setStateVar: Function) {
  const baseURL = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    fetch(`${baseURL}/api/${endpoint}`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "1"
      })
    })
      .then((response) => response.json())
      .then((data) => setStateVar(data))
      .catch((error) => console.error("Error fetching:", error));
  }, []);
}

const cache = new Map<String, HTMLElement>();
const secondCache = new Map<String, HTMLElement>();

// disk cache vs memory cache!
function preloadViews(image: string, denoiser: string, viewCache: Map<String, HTMLElement>) {
  const src =
    "https://cdn.jsdelivr.net/gh/norawennerstrom/lf-" +
    image +
    "/" +
    denoiser +
    "/view_";
    console.log("caching " + image + ": " + denoiser);
  for(let view = 1; view < 13*13; view++) {
    const imgSrc = src + view + ".webp";
    const img = new Image();
    img.src = imgSrc;
    viewCache.set(imgSrc, img);
  }
}

function App() {
  // load image sets
  const [lightFields, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("Bikes");
  fetchFromAPI("lightFields", setImages);

  // load denoisers
  const [denoisers, setDenoisers] = useState([]);
  const [selectedDenoiser, setSelectedDenoiser] = useState("Clean");
  const [secondSelectedDenoiser, setSecondSelectedDenoiser] = useState("Clean");
  fetchFromAPI("denoisers", setDenoisers);

  const [isDualView, setIsDualView] = useState<boolean>(false);

  // typ samma sak två gånger?
  // går in i else för båda varje gång (flytta den här koden någon annanstans?)
  useEffect(() => {
    cache.clear();
    if (selectedImage && selectedDenoiser) {
      preloadViews(selectedImage, selectedDenoiser, cache);
    }
  }, [selectedImage, selectedDenoiser]);

  useEffect(() => {
    secondCache.clear();
    if(selectedImage && secondSelectedDenoiser) {
      preloadViews(selectedImage, secondSelectedDenoiser, secondCache);
    }
  }, [selectedImage, secondSelectedDenoiser]);

  return (
    <>
      <Header lightFields={lightFields} setSelectedImage={setSelectedImage} setIsDualView={setIsDualView} isDualView={isDualView} />
      <Body
        selectedImage={selectedImage}
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
