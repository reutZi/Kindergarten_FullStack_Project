const db = require('../connectDB');

// Get all teachers
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await new Promise((resolve, reject) => {
            db.query(`
                SELECT id, first_name, last_name, phone
                FROM users
                WHERE role = 'teacher'
            `, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching teachers', error: err });
    }
};

// Get teacher by ID
const getTeacherById = async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await new Promise((resolve, reject) => {
            db.query(`
                SELECT id, first_name, last_name, phone
                FROM users
                WHERE role = 'teacher' AND id = ?
            `, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results.length ? results[0] : null);
            });
        });
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
        res.status(200).json(teacher);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching teacher', error: err });
    }
};

module.exports = {
    getAllTeachers,
    getTeacherById
};
