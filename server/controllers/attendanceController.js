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
const getAttendanceByChildId = async (req, res) => {
    const { cid, date } = req.params;

    try {
        const attendance = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM attendance WHERE cid = ? AND date = ?', [cid, date], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        if (attendance.length > 0) {
            // Attendance record found, return it
            return res.status(200).json(attendance[0]);
        } else {
            // No attendance record found, create one with default values
            const defaultAttendance = {
                cid,
                date,
                check_in_time: null,
                check_out_time: null,
                is_absent: false,
                absence_reason: '',
                expected_in_time: '08:00:00', // Set default expected in time
            };

            await new Promise((resolve, reject) => {
                db.query('INSERT INTO attendance SET ?', defaultAttendance, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            // Return the newly created attendance record
            return res.status(201).json(defaultAttendance);
        }
    } catch (error) {
        console.error('Error fetching or creating attendance:', error);
        return res.status(500).json({ error: 'Failed to fetch or create attendance' });
    }
};

const getAttendanceByDate = async (req, res) => {
    const { kindergartenId, date } = req.params;

    try {
        // Get all children in the kindergarten
        const children = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM children WHERE kindergarten_id = ?', [kindergartenId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        const attendancePromises = children.map(async (child) => {
            return new Promise((resolve, reject) => {
                // Check if attendance exists for each child on the specified date
                db.query('SELECT * FROM attendance WHERE cid = ? AND date = ?', [child.id, date], (err, results) => {
                    if (err) return reject(err);

                    if (results.length > 0) {
                        // Attendance record found, return it
                        resolve({ ...child, ...results[0] });
                    } else {
                        // No attendance record found, create one with default values
                        const defaultAttendance = {
                            cid: child.id,
                            date,
                            check_in_time: null,
                            check_out_time: null,
                            is_absent: false,
                            absence_reason: '',
                            expected_in_time: '08:00:00', // Default expected in time
                        };

                        db.query('INSERT INTO attendance SET ?', defaultAttendance, (err, result) => {
                            if (err) return reject(err);

                            // Return the child with the newly created attendance record
                            resolve({ ...child, ...defaultAttendance });
                        });
                    }
                });
            });
        });

        // Wait for all attendance records to be processed
        const attendances = await Promise.all(attendancePromises);

        // Return all attendances with child data
        return res.status(200).json(attendances);

    } catch (error) {
        console.error('Error fetching or creating attendances:', error);
        return res.status(500).json({ error: 'Failed to fetch or create attendances' });
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
