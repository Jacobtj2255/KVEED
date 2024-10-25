const socket = io(); // Connect to the WebSocket server

async function startVideoChat() {
    const localVideo = document.getElementById('localVideo');
    const stream = await navigator.mediaDevices.getUser Media({ video: true });
    localVideo.srcObject = stream;

    // Handle signaling for video chat
    socket.on('signal', (data) => {
        // Handle incoming signaling data (e.g., WebRTC signaling)
        console.log('Received signal:', data);
    });

    // Example of sending a signal (you would implement your WebRTC logic here)
    // socket.emit('signal', { to: 'someOtherSocketId', signal: 'yourSignalData' });
}

// Start the video chat when the page loads
window.onload = startVideoChat;

// Leave chat button functionality
document.getElementById('leaveChat').addEventListener('click', function() {
    console.log('Leaving chat...');
    // Logic to leave the chat
    window.location.href = 'index.html'; // Redirect back to the registration page
});