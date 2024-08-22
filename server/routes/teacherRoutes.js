const express = require('express');
const {
    getAllTeachers,
    getTeacherById
} = require('../controllers/teacherController');

const router = express.Router();

router.get('/', getAllTeachers);
router.get('/:id', getTeacherById);

module.exports = router;
