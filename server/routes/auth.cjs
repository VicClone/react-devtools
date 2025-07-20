const express = require('express');
const router = express.Router();

router.post('/register',  (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Имя, email и пароль обязательны!' });
    }

    res.status(201).json({ message: 'Регистрация успешна' });
})

module.exports = router;