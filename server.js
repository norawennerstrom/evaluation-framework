const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// serve the built frontend
app.use(express.static(path.resolve(__dirname, "dist")));

// get the light fields from lf.json (restore!)
app.get("/api/lightFields", (req, res) => {
  const jsonPath = path.join(__dirname, "lf.json");

  fs.readFile(jsonPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading lf.json: ", err);
      return res.status(500).json({ error: "Could not read lf.json" });
    }

    try {
      const parsed = JSON.parse(data);
      const lightFields = parsed.lightFields || [];
      res.json(lightFields);
    } catch (parseErr) {
      console.error("Error parsing lf.json: ", parseErr);
      res.status(500).json({ error: "Invalid JSON format in lf.json" });
    }
  });
});

// get the denoisers from lf.json (restore!)
app.get("/api/denoisers", (req, res) => {
  const jsonPath = path.join(__dirname, "lf.json");

  fs.readFile(jsonPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading lf.json: ", err);
      return res.status(500).json({ error: "Could not read lf.json" });
    }

    try {
      const parsed = JSON.parse(data);
      const denoisers = parsed.denoisers.map((d) => d.name) || [];
      res.json(denoisers);
    } catch (parseErr) {
      console.error("Error parsing lf.json: ", parseErr);
      res.status(500).json({ error: "Invalid JSON format in lf.json" });
    }
  });
});

// post the logs to perf_log.csv
app.post("/api/logPerformance", (req, res) => {
  const logDir = path.join(__dirname, "logs");
  const logFile = path.join(logDir, "perf_log.csv");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const { type, denoiser, duration, timestamp } = req.body;

  const line = `${timestamp},${type},${denoiser},${duration}\n`;

  fs.appendFile(logFile, line, (err) => {
    if (err) {
      console.error("Failed to write performance log:", err);
      return res.status(500).json({ error: "Log write failed" });
    }
    res.status(500).json({ status: "ok" });
  });
});

// fallback route for SPA (explain!)
// only serve index.html for paths that don't start with /api
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
