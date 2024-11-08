const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the database.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS cards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT 0,
        FOREIGN KEY (userId) REFERENCES users(id)
    )`);
});

module.exports = db;