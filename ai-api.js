// /public/ai-api.js
async function generateSong(audioBlob) {
    const formData = new FormData();
    formData.append('audioBlob', audioBlob); // Assuming you have an audioBlob object
    
    const response = await fetch('/api/music/generate', {
      method: 'POST',
      body: formData
    });
  
    const data = await response.json();
    return data.songUrl;  // Return the URL of the generated song
  }
  