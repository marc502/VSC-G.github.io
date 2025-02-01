// /public/record.js

let mediaRecorder;  // MediaRecorder instance
let audioChunks = [];  // Store audio data chunks while recording
let audioBlob;  // The recorded audio blob (final audio file)

// Start the audio recording
function startRecording() {
  // First, check if the browser supports the required APIs
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true }) // Request access to microphone
      .then(function(stream) {
        mediaRecorder = new MediaRecorder(stream); // Create a new MediaRecorder instance

        // When audio data is available, push it to the chunks array
        mediaRecorder.ondataavailable = function(event) {
          audioChunks.push(event.data);
        };

        // When recording is stopped, create an audio blob
        mediaRecorder.onstop = function() {
          audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          audioChunks = [];  // Clear the chunks array for the next recording

          // You can now pass this audioBlob to the backend for music generation
          console.log('Recording complete. Blob ready:', audioBlob);
          
          // Optionally: Display a URL for the recorded audio
          const audioUrl = URL.createObjectURL(audioBlob);
          document.getElementById('audio-preview').src = audioUrl; // Show the audio preview on the page
          document.getElementById('audio-preview').style.display = 'block'; // Show the audio preview element
        };

        mediaRecorder.start(); // Start recording
        console.log("Recording started...");
        
        // Optionally: Show a timer or other UI feedback while recording

        // Disable the "Record Now" button and show a "Stop Recording" button
        document.getElementById('record-btn').disabled = true;
        document.getElementById('stop-btn').disabled = false;
      })
      .catch(function(err) {
        console.error("Error accessing the microphone: ", err);
        alert("Error accessing the microphone. Please allow microphone access.");
      });
  } else {
    alert("Your browser does not support audio recording.");
  }
}

// Stop the recording and create the audio blob
function stopRecording() {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();  // Stop recording

    // Enable the "Record Now" button and disable the "Stop Recording" button
    document.getElementById('record-btn').disabled = false;
    document.getElementById('stop-btn').disabled = true;

    console.log("Recording stopped...");
  }
}

// Optionally, add a function to preview the audio or perform additional actions
function playAudioPreview() {
  const audioPreview = document.getElementById('audio-preview');
  if (audioPreview) {
    audioPreview.play();  // Play the audio preview
  }
}

// Optionally, a function to upload the recorded audio file to the backend
function uploadAudioToBackend() {
  if (audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recorded_audio.wav');

    // Send the recorded audio blob to the backend for processing
    fetch('/api/music/generate', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log("Music generated successfully!", data);
      // Handle the response (e.g., play the generated music)
    })
    .catch(error => {
      console.error("Error generating music: ", error);
      alert("Error generating music. Please try again.");
    });
  } else {
    alert("No audio recorded. Please record something first.");
  }
}

// Attach event listeners to buttons (these should exist in the HTML)
document.getElementById('record-btn').addEventListener('click', startRecording);
document.getElementById('stop-btn').addEventListener('click', stopRecording);
document.getElementById('play-btn').addEventListener('click', playAudioPreview);
document.getElementById('upload-btn').addEventListener('click', uploadAudioToBackend);

