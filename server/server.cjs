const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/auth.cjs');

const app = express();
const port = 3000;

app.use(express.json()); // для чтения JSON в запросе
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);
app.use(
    session({
        secret: 'dev-tools-session-secret',
        resave: false, // Не сохранять сессию, если она не была изменена
        saveUninitialized: false, // Не создавать сессию, пока в нее что-то не записано
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24, // Куки будут действовать 24 часа
            httpOnly: true,
            sameSite: 'lax',
        },
    })
);

app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
