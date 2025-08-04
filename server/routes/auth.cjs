const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ message: 'Имя, email и пароль обязательны!' });
    }

    const id = uuidv4();
    req.session.authenticated = true;
    req.session.user = { id, email };

    try {
        const fileName = 'users.json';
        let file;
        let users = [];
        if (fs.existsSync(fileName)) {
            file = fs.readFileSync(fileName, (err, data) => {
                if (err) {
                    throw err;
                }


            });
            users = JSON.stringify(file);
        }

        users.push({
            id,
            name,
            email,
            password,
        });

        await fs.writeFile(fileName, JSON.stringify(users), (err) => {
            if (err) {
                throw err;
            }

            console.log('user created');
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }

    req.session.save((err) => {
        if (err) {
            console.error('Ошибка сохранения сессии:', err);
            return res.status(500).send('Ошибка сервера');
        }
    });

    res.status(200).send(
        JSON.stringify({
            email: req.session.user.email,
            id: req.session.user.id,
        })
    );
});

router.get('/auth', async (req, res) => {
    if (req.session.user.id !== req.query.id) {
        res.status(401).send(JSON.stringify({ status: 'Не авторизован' }));
    }

    res.status(200).send(JSON.stringify({ status: 'авторизован' }));
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Не удалось выйти.');
        }
        res.status(200).send('Вы вышли из системы.');
    });
});

router.get('/user', (req, res) => {
    if (req.session.user.id !== req.query.id) {
        res.status(401).send({ status: 'Не авторизован' });
    }

    const file= fs.readFileSync(fileName, (err, data) => {
        if (err) {
            throw err;
        }


    });
    const users = JSON.parse(file);
    console.log(users);
    // const user = users.find((user) => user.id === req.query.id);
    const user = {};
    res.status(200).send(user);
});

module.exports = router;
