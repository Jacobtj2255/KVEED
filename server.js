// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Welcome to the College Video Chat API');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const User = require('./models/User');

// User registration endpoint
app.post('/register', async (req, res) => {
    const { college, graduationYear, age } = req.body;

    if (age < 18 || age > 28) {
        return res.status(400).json({ message: 'Age must be between 18 and 28.' });
    }

    const newUser  = new User({ college, graduationYear, age });
    await newUser .save();
    res.status(201).json({ message: 'User  registered successfully!' });
});
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (room) => {
        socket.join(room);
        console.log(`User  joined room: ${room}`);
    });

    socket.on('signal', (data) => {
        socket.to(data.room).emit('signal', {
            signal: data.signal,
            id: socket.id
        });
    });

    socket.on('disconnect', () => {
        console.log('User  disconnected');
    });
});