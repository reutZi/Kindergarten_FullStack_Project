const express = require('express');
const {
    getAllUsers,
    getUserById,
    getUserByUsername,
    getUsersByRole,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const router = express.Router();

// Get all users
router.get('/', getAllUsers);

// Get user by ID
router.get('/:id', getUserById);

// Get user by username
router.get('/username/:username', getUserByUsername);

// Get users by role (e.g., 'parent' or 'teacher')
router.get('/role/:role', getUsersByRole);

// Create a new user
router.post('/add', createUser);

// Update a user by ID
router.put('/update/:id', updateUser);

// Delete a user by ID
router.delete('/delete/:id', deleteUser);

module.exports = router;
