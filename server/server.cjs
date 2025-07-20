const express = require('express');
const authRoutes = require('./routes/auth.cjs');

const app = express();
const port = 3000

app.use(express.json()); // для чтения JSON в запросе

app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})