require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

connectDB(); // connect to MongoDB when the server starts

const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));