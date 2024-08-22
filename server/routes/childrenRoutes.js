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

const router = express.Router();

router.get('/', getAllChildren);
router.get('/:id', getChildById);
router.get('/kindergarten/:kindergarten_id', getChildrenByKindergartenId);
router.get('/parent/:pid', getChildrenByParentId);
router.post('/add', createChild);
router.put('/update/:id', updateChild);
router.delete('/delete/:id', deleteChild);

module.exports = router;
