// src/VideoChat.js
import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const VideoChat = () => {
    useEffect(() => {
        socket.emit('join', 'room1');

        socket.on('signal', (data) => {
            // Handle incoming signals for WebRTC
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Video Chat Room</h1>
            {/* Video elements will go here */}
        </div>
    );
};

export default VideoChat;