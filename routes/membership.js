const express = require('express');
const router = express.Router();

const membershipController = require('../controllers/membership_controller');

router.get('/',membershipController.home);
router.get('/batch/all',membershipController.getAllMembers);
router.get('/batch/:batch',membershipController.getMembersByBatch);
router.post('/add-member',membershipController.addMember);
router.put('/update-info/:id',membershipController.updateMemberInfo);
router.delete('/:id',membershipController.deleteMember);


module.exports = router;