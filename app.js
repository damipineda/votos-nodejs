const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cardRoutes = require('./routes/cardRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const http = require('http');
const socketIo = require('socket.io');

// Importa la base de datos
const db = require('./models/db');

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

//modificaciones
io.on('connection', (socket) => {
    socket.on('like', (cardId) => {
        db.run(`UPDATE cards SET likes = likes + 1 WHERE id = ?`, [cardId], (err) => {
            if (err) {
                console.error('Error al incrementar likes:', err);
                return;
            }
            
            // Obtener el total de likes actualizado
            db.get(`SELECT likes FROM cards WHERE id = ?`, [cardId], (err, row) => {
                if (!err && row) {
                    io.emit('update-likes', { 
                        cardId: cardId, 
                        totalLikes: row.likes 
                    });
                }
            });
        });
    });

    socket.on('dislike', (cardId) => {
        db.run(`UPDATE cards SET deslikes = deslikes + 1 WHERE id = ?`, [cardId], (err) => {
            if (err) {
                console.error('Error al incrementar deslikes:', err);
                return;
            }
            
            // Obtener el total de deslikes actualizado
            db.get(`SELECT deslikes FROM cards WHERE id = ?`, [cardId], (err, row) => {
                if (!err && row) {
                    io.emit('update-deslikes', { 
                        cardId: cardId, 
                        totalDeslikes: row.deslikes 
                    });
                }
            });
        });
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

