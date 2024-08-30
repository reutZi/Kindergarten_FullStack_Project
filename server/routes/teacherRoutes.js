const express = require('express');
const {
    getAllTeachers,
    getTeacherById,
    getTeacherByKindergartenId 
} = require('../controllers/teacherController');
const {authorizeRole}=require('./middleware/auth');

const router = express.Router();

router.get('/',authorizeRole('teacher'), getAllTeachers);
router.get('/:id', authorizeRole('teacher'),getTeacherById);
router.get('/kindergarten/:kindergartenId', getTeacherByKindergartenId);

module.exports = router;
