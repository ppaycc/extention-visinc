import { Server } from "socket.io";
import express from "express";
import { createServer } from 'node:http';

const app = express();
const port = process.env.PORT || 3000;

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
    console.log('Hello World!')
    res.send('Welcome to my server!');
});

server.listen(port, '0.0.0.0',() => {
    console.log(`Server is running on port ${port}`);
});