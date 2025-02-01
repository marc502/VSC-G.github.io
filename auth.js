// /public/auth.js

// This function is called when the Google Login button is clicked
function handleGoogleLogin() {
    // The client ID is needed to initialize the Google API
    const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'; // Replace with your actual Google Client ID
    
    gapi.load('auth2', function() {
      const auth2 = gapi.auth2.init({
        client_id: CLIENT_ID,  // Initialize the auth2 object with your Google Client ID
      });
  
      // Sign in the user using Google OAuth
      auth2.signIn().then(function(googleUser) {
        // Google user signed in successfully
        console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  
        // Get the user's Google profile information
        const profile = googleUser.getBasicProfile();
        const userId = profile.getId();
        const userName = profile.getName();
        const userEmail = profile.getEmail();
        const userImageUrl = profile.getImageUrl();
  
        // Store the user's information (You could use localStorage/sessionStorage or a state management tool)
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('userImageUrl', userImageUrl);
  
        // Show the main content after successful login
        document.getElementById('auth-container').style.display = 'none';  // Hide the login button
        document.getElementById('main-content').style.display = 'block';  // Show the main app content
      }).catch(function(error) {
        console.log('Google login error:', error);
        alert('Error logging in with Google. Please try again.');
      });
    });
  }
  
  // Check if the user is already logged in when the page loads
  function checkGoogleLoginStatus() {
    const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'; // Replace with your actual Google Client ID
    
    gapi.load('auth2', function() {
      const auth2 = gapi.auth2.init({
        client_id: CLIENT_ID,  // Initialize the auth2 object with your Google Client ID
      });
  
      const user = auth2.currentUser.get();
      if (user.isSignedIn()) {
        // User is already signed in
        const profile = user.getBasicProfile();
        const userId = profile.getId();
        const userName = profile.getName();
        const userEmail = profile.getEmail();
        const userImageUrl = profile.getImageUrl();
  
        // Store the user's information (You could use localStorage/sessionStorage or a state management tool)
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('userImageUrl', userImageUrl);
  
        // Hide the login button and show the app content
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
      }
    });
  }
  
  // Call checkGoogleLoginStatus() when the page loads to verify if the user is already logged in
  window.onload = function() {
    checkGoogleLoginStatus();
  };
  