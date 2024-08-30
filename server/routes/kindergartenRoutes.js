const express = require('express');
const { 
    getAllKindergartens, 
    getKindergartenById, 
    createKindergarten, 
    updateKindergarten, 
    deleteKindergarten 
} = require('../controllers/kindergartenController');
const {authorizeRole} = require('../middleware/auth');

const router = express.Router();

router.get('/',authorizeRole('teacher'), getAllKindergartens);
router.get('/:id', getKindergartenById);
router.post('/add', authorizeRole('teacher'), createKindergarten);
router.put('/update/:id', authorizeRole('teacher'), updateKindergarten);
router.delete('/delete/:id', authorizeRole('teacher'), deleteKindergarten);

module.exports = router;
