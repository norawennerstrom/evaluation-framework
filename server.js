// ChatGPT

const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Serve the built frontend
app.use(express.static(path.resolve(__dirname, "dist")));

// API: list available light fields (top-level folders in public/)
app.get("/api/lightFields", (req, res) => {
  const publicDir = path.join(__dirname, "public");

  fs.readdir(publicDir, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Could not read light fields" });
    }

    const lightFields = files
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    res.json(lightFields);
  });
});

// API: list denoiser folders inside Bikes
app.get("/api/denoisers", (req, res) => {
  // doesn't work with App.tsx, fix later
  //const lightField = req.params.lightField;
  //const lightFieldPath = path.join(__dirname, "public", lightField);

  const denoisersPath = path.join(__dirname, "public/Bikes");

  fs.readdir(denoisersPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Could not read denoisers" });
    }

    const denoisers = files
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    res.json(denoisers);
  });
});

// Fallback route for SPA (must come last)
console.log("__dirname:", __dirname);
console.log("Resolved index.html:", path.resolve(__dirname, "dist", "index.html"));

// try {
//   app.get("*", (req, res) => {
//     try {
//       const indexPath = path.resolve(__dirname, "dist", "index.html");
//       res.sendFile(indexPath);
//     } catch (err) {
//       console.error("Error sending index.html:", err);
//       res.status(500).send("Could not send index.html");
//     }
//   });
// } catch (err) {
//   console.error("Error in app.get:", err);
// }
// app.get("/test", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "dist", "index.html"));
// });
// Only serve index.html for paths that don't start with /api
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
