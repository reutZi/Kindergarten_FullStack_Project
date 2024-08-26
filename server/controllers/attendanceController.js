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

// Get child attendance by date
async function getChildAttendanceByDate(childId, date) {
    try {
        const attendanceQuery = `
            SELECT * FROM attendance 
            WHERE cid = ? AND date = ? AND is_absent = 0
        `;
        const result = await new Promise((resolve, reject) => {
            db.query(attendanceQuery, [childId, date], (err, results) => {
                if (err) return reject(err);
                resolve(results.length > 0);
            });
        });
        return result;
    } catch (error) {
        console.error('Error checking attendance:', error);
        return false;
    }
}
module.exports = {
    getAllAttendanceRecords,
    getAttendanceByChildId,
    getAttendanceByDate,
    getChildAttendanceByDate
};
