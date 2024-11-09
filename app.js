const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cardRoutes = require('./routes/cardRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);
//auth
const authRoutes = require('./routes/authRoutes.js');
app.use('/auth', authRoutes);

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Implementacion de soquet
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Escuchar eventos de 'like'
    socket.on('like', (cardId) => {
        io.emit('update-likes', cardId);
    });

    // Escuchar eventos de 'dislike'
    socket.on('dislike', (cardId) => {
        io.emit('update-deslikes', cardId);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});
// Rutas
app.use('/', cardRoutes);

//Evento de escucha del servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

