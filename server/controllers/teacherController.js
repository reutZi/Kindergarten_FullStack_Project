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
                SELECT users.id, users.first_name, users.last_name, users.phone, teacher.kin_id as kin_id
                FROM users
                JOIN teacher ON users.id = teacher.tid
                WHERE users.role = 'teacher' AND users.id = ?
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
const getTeacherByKindergartenId = async (req, res) => {
    const { kindergartenId } = req.params;
    try {
        const teacher = await new Promise((resolve, reject) => {
            db.query(`
                SELECT users.id, users.first_name, users.last_name, users.phone
                FROM users
                JOIN teacher ON users.id = teacher.tid
                WHERE teacher.kin_id = ?
            `, [kindergartenId], (err, results) => {
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
    getTeacherById,
    getTeacherByKindergartenId
};
