require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const studentsRoutes = require('./routes/students');
const attendanceRoutes = require('./routes/attendance');
const teachersRoutes = require('./routes/teachers');
const errorHandler = require('./middleware/errorHandler');


const adminAuthRoutes = require('./routes/adminAuth');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

// API base
app.use('/api/students', studentsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/teachers', teachersRoutes);

// Before other protected routes
app.use('/api/admin', adminAuthRoutes);

// health
app.get('/api/health', (req, res) => res.json({ ok: true, timestamp: new Date() }));

// error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
