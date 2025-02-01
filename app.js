// /public/app.js

// Handle Google login and display the next UI step
document.getElementById('google-login-btn').addEventListener('click', function() {
    // Call the function from auth.js to handle Google OAuth
    handleGoogleLogin();
  });
  
  // Handle voice recording or uploading a recorded audio
  document.getElementById('record-btn').addEventListener('click', function() {
    // Call the function from record.js to start recording
    startRecording();
  });
  
  document.getElementById('upload-btn').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      // Send the uploaded file to the backend for music generation
      handleAudioUpload(file);
    }
  });
  
  // Play the generated song
  document.getElementById('play-btn').addEventListener('click', function() {
    playGeneratedSong();
  });
  
  // Save the generated song
  document.getElementById('save-btn').addEventListener('click', function() {
    saveGeneratedSong();
  });
  
  // Function to start recording
  function startRecording() {
    // Call the function from record.js to start voice recording
    startVoiceRecording();
  }
  
  // Function to handle audio upload
  function handleAudioUpload(file) {
    // Send the uploaded file to backend to generate the song
    generateSongFromAudio(file).then(songUrl => {
      // Show playback controls and song URL
      displayPlayer(songUrl);
    });
  }
  
  // Show the player controls and the generated song
  function displayPlayer(songUrl) {
    document.getElementById('player').style.display = 'block';
    document.getElementById('play-btn').dataset.songUrl = songUrl;  // Store song URL in play button
  }
  
  // Function to play the song
  function playGeneratedSong() {
    const songUrl = document.getElementById('play-btn').dataset.songUrl;
    const audio = new Audio(songUrl);
    audio.play();
  }
  
  // Function to save the song
  function saveGeneratedSong() {
    const songUrl = document.getElementById('play-btn').dataset.songUrl;
    // Call the backend to save the song
    saveSong(songUrl);
  }
  