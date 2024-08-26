const express = require('express');
const {
    getAllAttendanceRecords,
    getAttendanceByChildId,
    getAttendanceByDate
} = require('../controllers/attendanceController');

const router = express.Router();

router.get('/', getAllAttendanceRecords);
router.get('/:cid', getAttendanceByChildId);
router.get('/:kindergartenId/:date', getAttendanceByDate);

module.exports = router;
