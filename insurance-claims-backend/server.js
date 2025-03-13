require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const claimRoutes = require('./routes/claimRoutes');

const app = express();
connectDB();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use('/auth', authRoutes);
app.use('/claims', claimRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
