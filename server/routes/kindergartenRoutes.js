const express = require('express');
const { 
    getAllKindergartens, 
    getKindergartenById, 
    createKindergarten, 
    updateKindergarten, 
    deleteKindergarten 
} = require('../controllers/kindergartenController');

const router = express.Router();

router.get('/', getAllKindergartens);
router.get('/:id', getKindergartenById);
router.post('/add', createKindergarten);
router.put('/update/:id', updateKindergarten);
router.delete('/delete/:id', deleteKindergarten);

module.exports = router;
