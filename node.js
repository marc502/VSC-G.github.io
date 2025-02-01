const express = require('express');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// API route to upload a voice recording
app.post('/upload', upload.single('voice'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // Send the uploaded file to AI model for music generation
  generateSong(req.file.path)
    .then((songData) => {
      res.json({ success: true, songData });
    })
    .catch((err) => {
      res.status(500).send('Error generating song: ' + err);
    });
});

// AI music generation function
async function generateSong(voiceFilePath) {
  // Here, you would call your AI music generation API or model. 
  // For this example, we're assuming an API endpoint that generates music based on a voice file.
  
  const aiResponse = await axios.post('https://your-ai-api.com/generate', {
    voiceFile: voiceFilePath
  });

  return aiResponse.data; // Assuming the AI returns a URL or data for the generated song
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
