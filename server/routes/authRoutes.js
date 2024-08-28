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
        let children = [];

        if (user.role === 'teacher') {
            // Fetch kindergarten_id for teachers
            const [results] = await db.promise().query('SELECT kin_id FROM teacher WHERE tid = ?', [user.id]);
            if (results.length > 0) {
                kindergartenId = results[0].kin_id;
            }
        } else if (user.role === 'parent') {
            // Fetch full child data for parents
            const [results] = await db.promise().query(`
                SELECT c.id, c.first_name, c.last_name, c.photo_url, c.allergy_info, c.kindergarten_id
                FROM children c
                JOIN parent p ON c.id = p.cid
                WHERE p.pid = ?
            `, [user.id]);

            children = results; // Full child details
        }

        const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const { password: _, ...userWithoutPassword } = user;

        // Include kindergarten_id if the user is a teacher
        // Include full child data if the user is a parent
        res.json({
            token,
            user: {
                ...userWithoutPassword,
                kindergarten_id: kindergartenId || null,
                children: children.length > 0 ? children : null
            }
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
