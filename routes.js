// /server/routes.js
const express = require('express');
const router = express.Router();
const musicController = require('./controllers/musicController'); // Import music controller

// Route for generating music
router.post('/generate', musicController.generateSong);

// Route for saving generated song
router.post('/save', musicController.saveSong);

module.exports = router; // Export the router
