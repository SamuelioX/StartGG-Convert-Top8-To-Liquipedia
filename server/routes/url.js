require("dotenv").config(); // Load .env variables
const express = require("express");
const router = express.Router();
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
// const fetch = require("node-fetch");
// Example API route
router.get("/data", async (req, res) => {
	const endpoint = req.query.endpoint || ""; // default empty string
	const apiUrl = `${API_URL}${endpoint}`;
	try {
		const response = await fetch(apiUrl, {
			headers: {
				Authorization: "Bearer" + API_KEY, // securely injected from .env
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			return res.status(response.status).json({ error: await response.text() });
		}

		const data = await response.json();
		res.json(data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
