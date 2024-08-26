const express = require('express');
const { userByUsername } = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../connectDB');

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userByUsername(username); // Existing function

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        let kindergartenId = null;
        
        // If the user is a teacher, fetch their kindergarten_id
        if (user.role === 'teacher') {
            const [results] = await db.promise().query('SELECT kin_id FROM teacher WHERE tid = ?', [user.id]);
            if (results.length > 0) {
                kindergartenId = results[0].kin_id;
            }
        }

        const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const { password: _, ...userWithoutPassword } = user;

        // Include kindergarten_id if the user is a teacher
        res.json({ token, user: { ...userWithoutPassword, kindergarten_id: kindergartenId } });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
