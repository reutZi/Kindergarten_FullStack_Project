const express = require('express');
const {
    getAllChildren,
    getChildById,
    getChildrenByKindergartenId,
    getChildrenByParentId,
    createChild,
    updateChild,
    deleteChild
} = require('../controllers/childrenController');
const {authorizeRole}=require('./middleware/auth');

const router = express.Router();

router.get('/', authorizeRole('teacher'),getAllChildren);
router.get('/:id', getChildById);
router.get('/kindergarten/:kindergarten_id',authorizeRole('teacher'), getChildrenByKindergartenId);
router.get('/parent/:pid',authorizeRole('parent'), getChildrenByParentId);
router.post('/add', createChild);
router.put('/update/:id', updateChild);
router.delete('/delete/:id', deleteChild);

module.exports = router;
