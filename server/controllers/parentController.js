const db = require('../connectDB');

// Get all parents
const getAllParents = async (req, res) => {
    try {
        const parents = await new Promise((resolve, reject) => {
            db.query(`
                SELECT id, first_name, last_name, phone
                FROM users
                WHERE role = 'parent'
            `, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json(parents);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching parents', error: err });
    }
};

// Get parent by ID
const getParentById = async (req, res) => {
    const { id } = req.params;
    try {
        const parent = await new Promise((resolve, reject) => {
            db.query(`
                SELECT id, first_name, last_name, phone
                FROM users
                WHERE role = 'parent' AND id = ?
            `, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results.length ? results[0] : null);
            });
        });
        if (!parent) return res.status(404).json({ message: 'Parent not found' });
        res.status(200).json(parent);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching parent', error: err });
    }
};

// Update parent details
const updateParent = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, phone } = req.body;

    try {
        await new Promise((resolve, reject) => {
            db.query(`
                UPDATE users
                SET first_name = ?, last_name = ?, phone = ?
                WHERE id = ? AND role = 'parent'
            `, [first_name, last_name, phone, id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        res.status(200).json({ message: 'Parent details updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating parent details', error: err });
    }
};

// Delete parent
const deleteParent = async (req, res) => {
    const { id } = req.params;

    try {
        await new Promise((resolve, reject) => {
            db.query(`
                DELETE FROM parent WHERE pid = ?
            `, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        await new Promise((resolve, reject) => {
            db.query(`
                DELETE FROM users WHERE id = ? AND role = 'parent'
            `, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        res.status(200).json({ message: 'Parent deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting parent', error: err });
    }
};

module.exports = {
    getAllParents,
    getParentById,
    updateParent,
    deleteParent
};
