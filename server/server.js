const express = require("express");
const path = require("path");
const appRoutes = require("./routes/url");

const app = express();

// Middleware for JSON
app.use(express.json());

// Use API routes
app.use("/api", appRoutes); // full path: /api/data

// Serve React static files
app.use(express.static(path.join(__dirname, "..", "build")));

// Catch-all: serve React for unknown routes

app.all("/{*any}", (req, res, next) => {
	res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
