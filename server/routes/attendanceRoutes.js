const express = require('express');
const {
    getAllAttendanceRecords,
    getAttendanceByChildId,
    getAttendanceByDate,
    saveAllAttendanceRecords
} = require('../controllers/attendanceController');
const {authorizeRole}=require('./middleware/auth');

const router = express.Router();

router.get('/', authorizeRole('teacher'),getAllAttendanceRecords);
router.get('/:cid', getAttendanceByChildId);
router.get('/:kindergartenId/:date',authorizeRole('teacher'), getAttendanceByDate);
router.post('/save', saveAllAttendanceRecords);


module.exports = router;
