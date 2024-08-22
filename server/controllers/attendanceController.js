const db = require('../connectDB');

// Get all attendance records
const getAllAttendanceRecords = async (req, res) => {
    try {
        const attendance = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM attendance', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json(attendance);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching attendance records', error: err });
    }
};

// Get attendance by child ID
const getAttendanceByChildId = async (req, res) => {
    const { cid } = req.params;
    try {
        const attendance = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM attendance WHERE cid = ?', [cid], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json(attendance);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching attendance for child', error: err });
    }
};

// Get attendance by specific date
const getAttendanceByDate = async (req, res) => {
    const { date } = req.params;
    try {
        const attendance = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM attendance WHERE date = ?', [date], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json(attendance);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching attendance for date', error: err });
    }
};

module.exports = {
    getAllAttendanceRecords,
    getAttendanceByChildId,
    getAttendanceByDate
};
