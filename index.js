const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());
const authRoutes = require('./routes/auth.route');
app.use('/api/auth', authRoutes);


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})