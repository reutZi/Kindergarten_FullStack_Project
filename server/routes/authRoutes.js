const express = require('express');
const { getUserByUsername } = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername(username);
        if (!user) {//user doesnt exist
            return res.sendStatus(401); // Unauthorized
        }//should hash?
        if (user.password !== password) {//password is incorect
            return res.sendStatus(401); // Unauthorized
        }
        // the user is authorized - Create a token with the user's role
        const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        //remove sensitive data
       const { password: _, ...userWithoutPassword } = user;
       // Send the token and user data back to the user  
       res.json({ token, user: userWithoutPassword });

    } catch (error) {
        console.error('Error during login:', error);
        res.sendStatus(500); // Internal Server Error
    }
});


module.exports = router;