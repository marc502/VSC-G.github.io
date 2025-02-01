// /public/audio-player.js

// Function to play the generated song
function playGeneratedSong() {
    const songUrl = document.getElementById('play-btn').dataset.songUrl; // Retrieve the song URL from the 'play' button
    if (songUrl) {
      const audio = new Audio(songUrl); // Create an audio element with the song URL
      audio.play(); // Start playing the song
  
      // Change the button to "Pause" while the song is playing
      document.getElementById('play-btn').innerText = "Pause Song";
  
      // Add event listeners to handle play/pause functionality
      document.getElementById('play-btn').addEventListener('click', function() {
        if (audio.paused) {
          audio.play(); // Play the song if paused
          document.getElementById('play-btn').innerText = "Pause Song"; // Update the button text to "Pause"
        } else {
          audio.pause(); // Pause the song if playing
          document.getElementById('play-btn').innerText = "Resume Song"; // Update the button text to "Resume"
        }
      });
    }
  }
  
  // Function to stop the generated song
  function stopGeneratedSong() {
    const audio = new Audio(); // Create a new audio element to stop the current audio
    audio.pause(); // Pause any currently playing audio
    audio.currentTime = 0; // Reset the audio to the beginning
  }
  
  // Function to change the volume of the audio
  function adjustVolume(volumeLevel) {
    const audio = new Audio(); // Assuming the audio element is already initialized
    audio.volume = volumeLevel; // Set the volume to the desired level (0.0 to 1.0)
  }
  