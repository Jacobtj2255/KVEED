// script.js
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Here you can handle registration logic (e.g., save data to a server)
    const college = document.getElementById('college').value;
    const graduationYear = document.getElementById('graduationYear').value;
    const age = document.getElementById('age').value;

    // Display the video chat section and hide the registration section
    document.getElementById('registration').style.display = 'none';
    document.getElementById('videoChat').style.display = 'block';

    // Initialize video chat (this can be replaced with actual video chat logic)
    startVideoChat();
});

function startVideoChat() {
    // Placeholder for video chat initialization logic
    console.log("Video chat started!");
    // Here you would set up WebRTC or any other video chat logic
}

// Optional: Add functionality to leave the chat
document.getElementById('leaveChat').addEventListener('click', function() {
    // Logic to leave chat
    document.getElementById('videoChat').style.display = 'none';
    document.getElementById('registration').style.display = 'block';
    console.log("Left the chat!");
});
// Connect to the WebSocket server
const socket = io();

// Handle form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const college = document.getElementById('college').value;
    const graduationYear = document.getElementById('graduationYear').value;
    const age = document.getElementById('age').value;

    // Age validation
    if (age < 18 || age > 28) {
        alert('Age must be between 18 and 28.');
        return;
    }

    // Send registration data to the server
    socket.emit('register', { college, graduationYear, age });

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
        // Access the user's webcam
        const stream = await navigator.mediaDevices.getUser Media({ video: true });
        localVideo.srcObject = stream;
    } catch (error) {
        console.error('Error accessing webcam: ', error);
        alert('Could not access the webcam. Please check your permissions.');
    }
}

// Leave chat button functionality
document.getElementById('leaveChat').addEventListener('click', function() {
    // Logic to leave the chat
    console.log('Leaving chat...');
    document.getElementById('videoChat').style.display = 'none';
    document.getElementById('registration').style.display = 'block';
});