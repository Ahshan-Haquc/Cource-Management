const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courceRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.set("trust proxy", 1);

app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://1-minute-quiz.vercel.app" // deployed frontend
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// router endpoints
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admin/courses', courseRoutes);

// here i will handle centralized errors
app.use(errorHandler);

module.exports = app;