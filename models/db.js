const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the database.');
    }
});

db.serialize(() => {
    // Crear la tabla users si no existe
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )`);

    // Crear la tabla cards si no existe
    db.run(`CREATE TABLE IF NOT EXISTS cards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            title TEXT,
            description TEXT,
            content TEXT NOT NULL,
            likes INTEGER DEFAULT 0,
            deslikes INTEGER DEFAULT 0
    )`, (err) => {
        if (err) {
            console.error("Error al crear la tabla 'cards':", err.message);
        }
    });

});

module.exports = db;