// Store active users
let activeUsers = new Map();

document.addEventListener('DOMContentLoaded', () => {
    let currentUserId = null;
    let localStream = null;

    // Function to generate unique user ID
    function generateUserId() {
        return Math.random().toString(36).substr(2, 9);
    }

    // Function to add user to active users
    function addActiveUser(userData) {
        const userId = generateUserId();
        activeUsers.set(userId, {
            ...userData,
            timestamp: new Date(),
            stream: null
        });
        return userId;
    }

    // Function to remove user from active users
    function removeActiveUser(userId) {
        activeUsers.delete(userId);
        updateAvailableUsersList();
    }

    // Function to update the available users list
    function updateAvailableUsersList() {
        const availableUsersContainer = document.getElementById('availableUsers');
        if (!availableUsersContainer) {
            const container = document.createElement('div');
            container.id = 'availableUsers';
            container.className = 'available-users';
            document.querySelector('#videoChat').appendChild(container);
        }

        const usersHtml = Array.from(activeUsers.entries())
            .filter(([id, _]) => id !== currentUserId)
            .map(([id, user]) => `
                <div class="user-card" onclick="connectWithUser('${id}')">
                    <div class="user-info">
                        <p>College: ${user.college}</p>
                        <p>Age: ${user.age}</p>
                        <p>Graduation Year: ${user.graduationYear}</p>
                    </div>
                    <button class="connect-btn">Connect</button>
                </div>
            `).join('');

        document.getElementById('availableUsers').innerHTML = 
            `<h3>Available Users (${activeUsers.size - 1})</h3>
             <div class="users-grid">${usersHtml}</div>`;
    }

    // Handle form submission
    document.getElementById('registrationForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const userData = {
            college: document.getElementById('college').value,
            graduationYear: document.getElementById('graduationYear').value,
            age: parseInt(document.getElementById('age').value)
        };

        // Age validation
        if (userData.age < 18 || userData.age > 28) {
            alert('Age must be between 18 and 28.');
            return;
        }

        try {
            // Get user media stream
            localStream = await navigator.mediaDevices.getUserMedia({ 
                video: true,
                audio: true 
            });

            // Add user to active users
            currentUserId = addActiveUser(userData);
            
            // Update UI
            document.getElementById('registration').style.display = 'none';
            document.getElementById('videoChat').style.display = 'block';
            
            // Display local video
            const localVideo = document.getElementById('localVideo');
            localVideo.srcObject = localStream;

            // Update available users list
            updateAvailableUsersList();

        } catch (error) {
            console.error('Error accessing media devices:', error);
            alert('Could not access camera/microphone. Please check permissions.');
        }
    });

    // Function to connect with another user
    window.connectWithUser = function(userId) {
        const remoteUser = activeUsers.get(userId);
        if (remoteUser) {
            const remoteVideo = document.getElementById('remoteVideo');
            // In a real implementation, this would involve WebRTC signaling
            alert('Connecting with user from ${remoteUser.college}');
        }
    };

    // Handle leave chat
    document.getElementById('leaveChat').addEventListener('click', function() {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        
        if (currentUserId) {
            removeActiveUser(currentUserId);
        }

        document.getElementById('videoChat').style.display = 'none';
        document.getElementById('registration').style.display = 'block';
        
        const localVideo = document.getElementById('localVideo');
        const remoteVideo = document.getElementById('remoteVideo');
        localVideo.srcObject = null;
        remoteVideo.srcObject = null;
    });
});