const express = require('express');
const cors = require('cors'); 
const kindergartenRoutes = require('./routes/kindergartenRoutes');
const childrenRoutes = require('./routes/childrenRoutes');
const parentRoutes = require('./routes/parentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const userRoutes = require('./routes/userRoutes');
const { authenticateToken, authorizeRole } = require('./middleware/auth');
const authRoutes = require('./routes/authRoutes');


require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

//server endpoints 
app.use('/login', authRoutes);
app.use('/kindergarten', authenticateToken, authorizeRole('teacher'), kindergartenRoutes);
app.use('/children', authenticateToken, authorizeRole('teacher'), childrenRoutes);
app.use('/parent', authenticateToken, authorizeRole('parent'), parentRoutes);
app.use('/teacher', authenticateToken, authorizeRole('teacher'), teacherRoutes);
app.use('/user', authenticateToken, userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

