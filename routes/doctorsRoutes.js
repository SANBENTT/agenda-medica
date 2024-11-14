const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController.js');

router.get('/', doctorController.getDoctors);
router.post('/add', doctorController.addDoctor);
router.get('/edit/:id', doctorController.editDoctor);
router.post('/edit/:id', doctorController.updateDoctor);
router.get('/delete/:id', doctorController.deleteDoctor);

module.exports = router;