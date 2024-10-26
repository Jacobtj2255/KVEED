// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Connect to the WebSocket server (comment this out if you haven't set up the server yet)
    // const socket = io();

    // Handle form submission
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const college = document.getElementById('college').value;
        const graduationYear = document.getElementById('graduationYear').value;
        const age = parseInt(document.getElementById('age').value);

        // Age validation
        if (age < 18 || age > 28) {
            alert('Age must be between 18 and 28.');
            return;
        }

        // Hide registration and show video chat
        document.getElementById('registration').style.display = 'none';
        document.getElementById('videoChat').style.display = 'block';

        // Start video chat
        startVideoChat();
    });

    // Function to start video chat
    async function startVideoChat() {
        const localVideo = document.getElementById('localVideo');

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: true,
                audio: true 
            });
            localVideo.srcObject = stream;
        } catch (error) {
            console.error('Error accessing webcam: ', error);
            alert('Could not access the webcam. Please check your permissions.');
        }
    }

    // Leave chat button functionality
    document.getElementById('leaveChat').addEventListener('click', function() {
        const localVideo = document.getElementById('localVideo');
        
        // Stop all tracks in the stream
        if (localVideo.srcObject) {
            const tracks = localVideo.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }

        // Reset video source
        localVideo.srcObject = null;

        // Hide video chat and show registration
        document.getElementById('videoChat').style.display = 'none';
        document.getElementById('registration').style.display = 'block';
    });
});