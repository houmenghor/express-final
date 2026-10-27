const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());
const authRoutes = require('./routes/auth.route');
app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
    res.send({
        status: 'success',
        message: 'api is running'
    });
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})