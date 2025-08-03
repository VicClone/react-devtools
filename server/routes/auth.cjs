const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

router.post('/register',  async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Имя, email и пароль обязательны!' });
    }

    try {
        const uuid = uuidv4();
        await fs.writeFile('users.json', JSON.stringify({id: uuid, name, email, password}), (err) => {
            throw new Error(err);
        });

        req.session.authenticated = true;
        req.session.user = { id: uuid, email };
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }

    res.status(200).send(JSON.stringify({email: req.session.user.email, id: req.session.user.id}));
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;

})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Не удалось выйти.');
        }
        res.status(200).send('Вы вышли из системы.');
    });
})

module.exports = router;