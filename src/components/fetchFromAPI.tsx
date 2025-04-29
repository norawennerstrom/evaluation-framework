import { useEffect } from "react";

function fetchFromAPI(endpoint: string, setStateVar: Function) {
  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    fetch(`${baseURL}/api/${endpoint}`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "1",
      }),
    })
      .then((response) => response.json())
      .then((data) => setStateVar(data))
      .catch((error) => console.error("Error fetching:", error));
  }, []);
}
export default fetchFromAPI;
