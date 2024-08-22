const express = require('express');
const cors = require('cors');
const kindergartenRoutes = require('./routes/kindergartenRoutes');
const childrenRoutes = require('./routes/childrenRoutes');
const parentRoutes = require('./routes/parentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/kindergarten', kindergartenRoutes);
app.use('/children', childrenRoutes);
app.use('/parent', parentRoutes);
app.use('/teacher', teacherRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
