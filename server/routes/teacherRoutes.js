const express = require('express');
const {
    getAllTeachers,
    getTeacherById,
    getTeacherByKindergartenId 
} = require('../controllers/teacherController');

const router = express.Router();

router.get('/', getAllTeachers);
router.get('/:id', getTeacherById);
router.get('/kindergarten/:kindergartenId', getTeacherByKindergartenId);

module.exports = router;
