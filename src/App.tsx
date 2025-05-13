import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Body from "./components/Body";

function App() {
  const [selectedLightField, setSelectedLightField] = useState("Bikes");
  const [isDualView, setIsDualView] = useState<boolean>(true);

  return (
    <>
      <Header
        setSelectedLightField={setSelectedLightField}
        setIsDualView={setIsDualView}
        isDualView={isDualView}
      />
      <Body selectedLightField={selectedLightField} isDualView={isDualView} />
    </>
  );
}

export default App;
