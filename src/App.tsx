import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Body from "./components/Body";

function App() {
  // component containing the whole app

  // state variable for determining the displayed light field (default: Bikes)
  const [selectedLightField, setSelectedLightField] = useState("Bikes");
  // state variable for determining whether to display two light fields (default: true)
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
