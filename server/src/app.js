const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courceRoutes');
const errorHandler = require('./middlewares/errorHandler');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);


// here i will handle centralized errors
app.use(errorHandler);


module.exports = app;