const express = require('express');
const {
    getAllAttendanceRecords,
    getAttendanceByChildId,
    getAttendanceByDate,
    saveAllAttendanceRecords,
} = require('../controllers/attendanceController');

const router = express.Router();

router.get('/', getAllAttendanceRecords);
router.get('/:cid', getAttendanceByChildId);
router.get('/:kindergartenId/:date', getAttendanceByDate);
router.post('/save', saveAllAttendanceRecords);

module.exports = router;
