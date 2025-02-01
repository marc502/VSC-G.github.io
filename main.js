// This file will contain the JavaScript logic for handling the recording,
// sending audio to the backend, generating music, etc.

let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioUrl;

// Google Sign-In Success
function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log('Logged in as: ' + profile.getName());
  document.getElementById('user-content').style.display = 'block';
  document.getElementById('g-signin2').style.display = 'none';
}

// Start Recording Function
function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (stream) {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = function (event) {
        audioChunks.push(event.data);
      };
      mediaRecorder.onstop = function () {
        audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        audioChunks = [];
        audioUrl = URL.createObjectURL(audioBlob);
        document.getElementById('audio-preview').src = audioUrl;
        document.getElementById('audio-preview').style.display = 'block';
        document.getElementById('play-btn').disabled = false;
        document.getElementById('save-btn').disabled = false;
      };
      mediaRecorder.start();
      document.getElementById('record-btn').disabled = true;
      document.getElementById('stop-btn').disabled = false;
      console.log("Recording started...");
    })
    .catch(function (err) {
      alert("Error accessing microphone.");
    });
}

// Stop Recording Function
function stopRecording() {
  if (mediaRecorder) {
    mediaRecorder.stop();
    document.getElementById('record-btn').disabled = false;
    document.getElementById('stop-btn').disabled = true;
    console.log("Recording stopped.");
  }
}

// Play Recording
function playRecording() {
  const audioPreview = document.getElementById('audio-preview');
  if (audioPreview) {
    audioPreview.play();
  }
}

// Send Audio to Backend (Upload)
function saveSongToBackend(audioBlob) {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'generated_song.wav');

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log('Server response:', data);
      alert('Song uploaded successfully!');
    })
    .catch(error => {
      console.error('Error uploading song:', error);
      alert('Error uploading song. Please try again.');
    });
}

// Update Tempo Value
document.getElementById('tempo').addEventListener('input', function (event) {
  document.getElementById('tempo-value').textContent = event.target.value + ' BPM';
});

// Handle Music Generation
document.getElementById('generate-music-btn').addEventListener('click', function () {
  const tempo = document.getElementById('tempo').value;
  const genre = document.getElementById('genre').value;

  fetch('/generate-music', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tempo: tempo, genre: genre })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Generated music:', data);
      const audioUrl = URL.createObjectURL(data.audioBlob);
      document.getElementById('audio-preview').src = audioUrl;
      document.getElementById('audio-preview').style.display = 'block';
    })
    .catch(error => {
      console.error('Error generating music:', error);
    });
});

document.getElementById('save-btn').addEventListener('click', function () {
  saveSongToBackend(audioBlob);
});
