function logPerformance(type: string, denoiser: string, duration: string) {
  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : import.meta.env.VITE_API_BASE_URL;
  fetch(`${baseURL}/api/logPerformance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "1",
    },
    body: JSON.stringify({
      type,
      denoiser,
      duration,
      timestamp: new Date().toISOString(),
    }),
  }).catch((err) => console.error("Failed to send log:", err));
}

export default logPerformance;
