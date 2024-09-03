const express = require('express');
const { userByUsername } = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../connectDB');

router.post('/', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const user = await userByUsername(username); 

        if (!user || user.role !== role) {
            return res.status(401).json({ message: 'משתמש לא קיים במערכת' });
        }

        const isPasswordCorrect = user.password === password; 
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'סיסמה שגויה' });
        }

        let kindergartenId = null;
        let children = [];

        if (user.role === 'teacher') {
            const [results] = await db.promise().query('SELECT kin_id FROM teacher WHERE tid = ?', [user.id]);
            console.log("results: " , results);
            if (results.length > 0) {
                kindergartenId = results[0].kin_id;
            }
        } else if (user.role === 'parent') {
            const [results] = await db.promise().query(`
                SELECT c.id, c.first_name, c.last_name, c.allergy_info, c.kindergarten_id, c.parent1_phone, c.parent2_phone
                FROM children c
                JOIN parent p ON c.id = p.cid
                WHERE p.pid = ?
            `, [user.id]);

            children = results;
        }

        const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const { password: _, ...userWithoutPassword } = user;

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
