const express = require('express');
const session = require('express-session');
const cors = require('cors')
const authRoutes = require('./routes/auth.cjs');

const app = express();
const port = 3000

app.use(express.json()); // для чтения JSON в запросе
app.use(cors());
// Настройка сессий
app.use(session({
    // Обязательный секретный ключ для подписи ID сессии
    secret: 'your_super_secret_key_for_session',
    resave: false, // Не сохранять сессию, если она не была изменена
    saveUninitialized: false, // Не создавать сессию, пока в нее что-то не записано
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Куки будут действовать 24 часа
    }
}));

app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})