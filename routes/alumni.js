const express = require('express');
const router = express.Router();
const multer = require('multer');
const file = multer();

const alumniController = require('../controllers/alumni_controller');

router.get('/', alumniController.home);
router.get('/batch/all',alumniController.getAllAlumni);
router.get('/batch/:batch', alumniController.getAlumniByBatch);
router.post('/add-alumni', file.single('image'), alumniController.addAlumni);
router.put('/update-info/:id', alumniController.updateAlumniInfo);
router.delete('/:id', alumniController.deleteAlumni);

module.exports = router;
