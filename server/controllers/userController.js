const db = require('../connectDB');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results.length ? results[0] : null);
            });
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err });
    }
};

// Get user by username
const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
                if (err) return reject(err);
                resolve(results.length ? results[0] : null);
            });
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user by username', error: err });
    }
};

// Get users by role
const getUsersByRole = async (req, res) => {
    const { role } = req.params;
    try {
        const users = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE role = ?', [role], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users by role', error: err });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const { id, first_name, last_name, username, password, phone, role } = req.body;
    try {
        await new Promise((resolve, reject) => {
            db.query('INSERT INTO users (id, first_name, last_name, username, password, phone, role) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [id, first_name, last_name, username, password, phone, role], 
            (err, results) => {
                if (err) return reject(err);
                resolve(results.insertId);
            });
        });
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, username, password, phone, role } = req.body;
    try {
        await new Promise((resolve, reject) => {
            db.query('UPDATE users SET first_name = ?, last_name = ?, username = ?, password = ?, phone = ?, role = ? WHERE id = ?', 
            [first_name, last_name, username, password, phone, role, id], 
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await new Promise((resolve, reject) => {
            db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    getUsersByRole,
    createUser,
    updateUser,
    deleteUser
};
