const db = require('../connectDB');
const { format } = require('date-fns');

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
// Get parent's phone number by child ID
const getParentPhoneNumberByID = async (req, res) => {
    const { childId } = req.params;

    try {
        const parentPhoneNumber = await new Promise((resolve, reject) => {
            const parentPhoneQuery = `
                SELECT u.phone 
                FROM parent p
                JOIN users u ON p.pid = u.id
                WHERE p.cid = ?
            `;
            db.query(parentPhoneQuery, [childId], (err, results) => {
                if (err) return reject(err);
                resolve(results.length ? results[0].phone : null);
            });
        });

        if (!parentPhoneNumber) {
            return res.status(404).json({ message: 'Parent phone number not found' });
        }

        res.status(200).json({ phoneNumber: parentPhoneNumber });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching parent phone number', error: err });
    }
};


const getAttendanceByMonth = async (req, res) => {
    const { cid } = req.params;  // The child ID from the request parameters
    const { year, month } = req.query;  // The year and month will be passed as query parameters

    try {
        // Query the attendance records for the specified child and month
        const attendanceRecords = await new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM attendance 
                 WHERE cid = ? 
                 AND YEAR(date) = ? 
                 AND MONTH(date) = ?`,
                [cid, year, month],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });

        // If no records are found, return an empty array
        if (!attendanceRecords || attendanceRecords.length === 0) {
            return res.status(200).json([]);
        }

        // Return the attendance records for the specified child and month
        return res.status(200).json(attendanceRecords);

    } catch (error) {
        console.error('Error fetching attendance records:', error);
        return res.status(500).json({ error: 'Failed to fetch attendance records' });
    }
};

const saveAttendanceRecord = async (req, res) => {
    const { cid } = req.params;
    console.log('cid: ', cid);
    const { date, check_in_time, check_out_time, is_absent, absence_reason, expected_in_time } = req.body;

    try {
        // Ensure the date is in the correct format
        const formattedDate = date ? format(new Date(date), 'yyyy-MM-dd') : null;

        // Prepare the attendance data, setting null explicitly for missing fields
        const attendanceData = {
            check_in_time: typeof check_in_time !== 'undefined' ? check_in_time : null,
            check_out_time: typeof check_out_time !== 'undefined' ? check_out_time : null,
            is_absent: typeof is_absent !== 'undefined' ? is_absent : null,
            absence_reason: typeof absence_reason !== 'undefined' ? absence_reason : null,
            expected_in_time: typeof expected_in_time !== 'undefined' ? expected_in_time : null,
        };

        const result = await new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO attendance (cid, date, check_in_time, check_out_time, is_absent, absence_reason, expected_in_time) 
                 VALUES (?, ?, ?, ?, ?, ?, ?) 
                 ON DUPLICATE KEY UPDATE check_in_time = ?, check_out_time = ?, is_absent = ?, absence_reason = ?, expected_in_time = ?`,
                [
                    cid, formattedDate, attendanceData.check_in_time, attendanceData.check_out_time, attendanceData.is_absent, attendanceData.absence_reason, attendanceData.expected_in_time,
                    attendanceData.check_in_time, attendanceData.check_out_time, attendanceData.is_absent, attendanceData.absence_reason, attendanceData.expected_in_time,
                ],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });

        return res.status(200).json({ message: 'Attendance record saved successfully' });
    } catch (error) {
        console.error('Error saving attendance record:', error);
        return res.status(500).json({ error: 'Failed to save attendance record' });
    }
};




module.exports = {
    getAllParents,
    getParentById,
    updateParent,
    deleteParent,
    getParentPhoneNumberByID,
    getAttendanceByMonth,
    saveAttendanceRecord
};
