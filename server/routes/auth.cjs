const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const FILE_PATH = 'users.json';

const getUsersFromFile = () => {
    if (!fs.existsSync(FILE_PATH)) {
        return [];
    }

    const file = fs.readFileSync(FILE_PATH, (err) => {
        if (err) {
            throw err;
        }
    });

    return JSON.parse(file);
};

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
        const users = getUsersFromFile();

        console.log(users);

        users.push({
            id,
            name,
            email,
            password,
        });

        await fs.writeFile(FILE_PATH, JSON.stringify(users), (err) => {
            if (err) {
                throw err;
            }

            console.log('user created');
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }

    res.status(200).send(
        JSON.stringify({
            email: req.session.user.email,
            id: req.session.user.id,
        })
    );
});

router.post('/auth', async (req, res) => {
    console.log(req.session?.user);
    if (req.session?.user?.id !== req.body.id) {
        return res
            .status(401)
            .send(JSON.stringify({ status: 'Не авторизован' }));
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
    if (req.session?.user?.id !== req.query.id) {
        return res.status(401).send({ status: 'Не авторизован' });
    }

    const users = getUsersFromFile();
    const user = users.find((user) => user.id === req.query.id);

    if (!user) {
        return res.status(500).send({ status: 'Пользователь не найден' });
    }

    res.status(200).send(user);
});

module.exports = router;
