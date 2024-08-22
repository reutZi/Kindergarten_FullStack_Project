const db = require('../connectDB');

// Get all kindergartens
const getAllKindergartens = async (req, res) => {
    try {
        const kindergartens = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM kindergarten', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json(kindergartens);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching kindergartens', error: err });
    }
};

// Get kindergarten by ID
const getKindergartenById = async (req, res) => {
    const { id } = req.params;
    try {
        const kindergarten = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM kindergarten WHERE id = ?', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results.length ? results[0] : null);
            });
        });
        if (!kindergarten) return res.status(404).json({ message: 'Kindergarten not found' });
        res.status(200).json(kindergarten);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching kindergarten', error: err });
    }
};

// Create a new kindergarten
const createKindergarten = async (req, res) => {
    const { id, name, city } = req.body;
    try {
        await new Promise((resolve, reject) => {
            db.query('INSERT INTO kindergarten (id, name, city) VALUES (?, ?, ?)', [id, name, city], (err, results) => {
                if (err) return reject(err);
                resolve(results.insertId);
            });
        });
        res.status(201).json({ message: 'Kindergarten created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating kindergarten', error: err });
    }
};

// Update a kindergarten by ID
const updateKindergarten = async (req, res) => {
    const { id } = req.params;
    const { name, city } = req.body;
    try {
        await new Promise((resolve, reject) => {
            db.query('UPDATE kindergarten SET name = ?, city = ? WHERE id = ?', [name, city, id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json({ message: 'Kindergarten updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating kindergarten', error: err });
    }
};

// Delete a kindergarten by ID
const deleteKindergarten = async (req, res) => {
    const { id } = req.params;
    try {
        await new Promise((resolve, reject) => {
            db.query('DELETE FROM kindergarten WHERE id = ?', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json({ message: 'Kindergarten deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting kindergarten', error: err });
    }
};

module.exports = {
    getAllKindergartens,
    getKindergartenById,
    createKindergarten,
    updateKindergarten,
    deleteKindergarten
};
