import { Server } from "socket.io";
import express from "express";
import { createServer } from 'node:http';

const app = express();
const port = 3000;

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('CONNECTED')
    socket.onAny((event, message) => {
        console.log('EVENT', event, message);
        io.emit(event, message);
    })
})

app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});