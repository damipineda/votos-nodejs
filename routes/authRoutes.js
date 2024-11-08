// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../models/db'); // Asegúrate de que este sea el archivo correcto para la conexión a la base de datos
const router = express.Router();
const saltRounds = 10;

// Ruta para registro de usuario
router.post('/register', [
    body('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
    body('password').isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Verificar si el usuario ya existe
    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
        if (user) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Insertar nuevo usuario en la base de datos
        db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, hashedPassword], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error al registrar el usuario' });
            }
            res.status(201).json({ message: 'Usuario registrado con éxito' });
        });
    });
});

// Ruta para inicio de sesión
router.post('/login', [
    body('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Buscar al usuario en la base de datos
    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Comparar la contraseña proporcionada con la almacenada
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            // Generar un token JWT
            const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' }); // Cambia 'secret_key' por una clave más segura
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    });
});

module.exports = router;