const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
const kindergartenRoutes = require('./routes/kindergartenRoutes');
const childrenRoutes = require('./routes/childrenRoutes');
const parentRoutes = require('./routes/parentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const userRoutes = require('./routes/userRoutes');
const { authenticateToken} = require('./middleware/auth');
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const noticeBoardRoutes = require('./routes/noticeBoardRoutes');
const pictureRoutes = require('./routes/pictureRoutes'); 
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kindergarten')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
  });


// Server endpoints 
app.use('/login', authRoutes);
app.use('/kindergarten', authenticateToken, kindergartenRoutes);
app.use('/children', authenticateToken, childrenRoutes);
app.use('/parent', authenticateToken,parentRoutes);
app.use('/teacher', authenticateToken, teacherRoutes);
app.use('/attendance', authenticateToken, attendanceRoutes);
app.use('/user', authenticateToken, userRoutes);
app.use('/noticeBoard', authenticateToken, noticeBoardRoutes);
app.use('/pictures', authenticateToken, pictureRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
