document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const college = document.getElementById('college').value;
    const graduationYear = document.getElementById('graduationYear').value;
    const age = document.getElementById('age').value;

    if (age < 18 || age > 28) {
        alert('Age must be between 18 and 28.');
        return;
    }

    // Here you would typically send the data to your server
    console.log(`College: ${college}, Graduation Year: ${graduationYear}, Age: ${age}`);

    // Hide registration and show video chat
    document.getElementById('registration').style.display = 'none';
    document.getElementById('videoChat').style.display = 'block';

    // Start video chat
    startVideoChat();
});

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
const socket = io(); // Connect to the WebSocket server

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const college = document.getElementById('college').value;
    const graduationYear = document.getElementById('graduationYear').value;
    const age = document.getElementById('age').value;

    if (age < 18 || age > 28) {
        alert('Age must be between 18 and 28.');
        return;
    }

    // Send registration data to the server
    socket.emit('register', { college, graduationYear, age });

    // Redirect to the video chat page
    window.location.href = 'video-chat.html';
});