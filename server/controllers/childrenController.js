const db = require('../connectDB');

// Get all children
const getAllChildren = async (req, res) => {
    try {
        const children = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM children', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json(children);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching children', error: err });
    }
};

// Get child by ID
const getChildById = async (req, res) => {
    const { id } = req.params;
    try {
        const child = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM children WHERE id = ?', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results.length ? results[0] : null);
            });
        });
        if (!child) return res.status(404).json({ message: 'Child not found' });
        res.status(200).json(child);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching child', error: err });
    }
};

// Get children by kindergarten ID
const getChildrenByKindergartenId = async (req, res) => {
    const { kindergarten_id } = req.params;
    try {
        const children = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM children WHERE kindergarten_id = ?', [kindergarten_id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json(children);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching children by kindergarten ID', error: err });
    }
};

// Get children by parent ID
const getChildrenByParentId = async (req, res) => {
    const { pid } = req.params;
    try {
        const children = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM children WHERE id IN (SELECT cid FROM parent WHERE pid = ?)', [pid], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json(children);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching children by parent ID', error: err });
    }
};

// Create child
const createChild = async (req, res) => {
    const { id, first_name, last_name, photo_url, allergy_info, kindergarten_id } = req.body;
    try {
        await new Promise((resolve, reject) => {
            db.query('INSERT INTO children (id, first_name, last_name, photo_url, allergy_info, kindergarten_id) VALUES (?, ?, ?, ?, ?, ?)', [id, first_name, last_name, photo_url, allergy_info, kindergarten_id], (err, results) => {
                if (err) return reject(err);
                resolve(results.insertId);
            });
        });
        res.status(201).json({ message: 'Child created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating child', error: err });
    }
};

// Update child
const updateChild = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, photo_url, allergy_info, kindergarten_id } = req.body;
    try {
        await new Promise((resolve, reject) => {
            db.query('UPDATE children SET first_name = ?, last_name = ?, photo_url = ?, allergy_info = ?, kindergarten_id = ? WHERE id = ?', [first_name, last_name, photo_url, allergy_info, kindergarten_id, id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json({ message: 'Child updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating child', error: err });
    }
};

// Delete child
const deleteChild = async (req, res) => {
    const { id } = req.params;
    try {
        await new Promise((resolve, reject) => {
            db.query('DELETE FROM children WHERE id = ?', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json({ message: 'Child deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting child', error: err });
    }
};

module.exports = {
    getAllChildren,
    getChildById,
    getChildrenByKindergartenId,
    getChildrenByParentId,
    createChild,
    updateChild,
    deleteChild
};
