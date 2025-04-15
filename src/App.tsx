import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Body from "./components/Body";

function fetchFromAPI(endpoint: string, setStateVar: Function) {
  const baseURL = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : import.meta.env.VITE_API_BASE_URL; // empty string if served from same domain
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

function App() {
  // load image sets
  const [lightFields, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  fetchFromAPI("lightFields", setImages);

  // load denoisers
  const [denoisers, setDenoisers] = useState([]);
  const [selectedDenoiser, setSelectedDenoiser] = useState("");
  const [secondSelectedDenoiser, setSecondSelectedDenoiser] = useState("");
  fetchFromAPI("denoisers", setDenoisers);

  const [isDualView, setIsDualView] = useState<boolean>(false);

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
