// /public/save-song.js

// Function to download the generated song
function downloadSong(audioUrl, filename) {
    // Create an anchor element to trigger the download
    const a = document.createElement('a');
    a.href = audioUrl;  // Set the URL of the audio file to the anchor's href
    a.download = filename;  // Set the download file name
    a.click();  // Simulate a click to start the download
  
    console.log('Song downloaded: ' + filename);
  }
  
  // Function to save the generated song (either locally or remotely)
  function saveGeneratedSong(audioBlob) {
    if (audioBlob) {
      // Generate a URL for the audio blob (this will be used for downloading or previewing)
      const audioUrl = URL.createObjectURL(audioBlob);
  
      // Optional: Send the song data to the server for permanent storage
      // This would be a POST request to save the song on the server
      saveSongToBackend(audioBlob);
  
      // Download the generated song (e.g., as a .wav or .mp3 file)
      const filename = 'generated_song.wav';  // You can customize the file name
      downloadSong(audioUrl, filename);
  
      // You can display a success message or update the UI after the song is saved
      alert('Your song has been saved successfully!');
    } else {
      alert('No song available to save. Please try again.');
    }
  }
  
  // Function to upload the generated song to the backend (optional)
  function saveSongToBackend(audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'generated_song.wav'); // Append the audio blob
  
    // Send the audio file to the backend for storage or further processing
    fetch('/api/music/save', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Song saved on server:', data);
      // You can handle any additional logic here, like notifying the user
    })
    .catch(error => {
      console.error('Error saving the song:', error);
      alert('There was an error saving your song. Please try again later.');
    });
  }
  
  // Optionally, add event listeners for UI interactions
  document.getElementById('save-btn').addEventListener('click', function() {
    const audioBlob = window.audioBlob;  // Assuming audioBlob is globally available after generating the song
    saveGeneratedSong(audioBlob);
  });
  