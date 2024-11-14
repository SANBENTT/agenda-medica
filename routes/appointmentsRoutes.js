const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController.js');

router.get('/', appointmentController.getAppointments);
router.post('/add', appointmentController.addAppointment);
router.get('/update/:id', appointmentController.editAppointment);
router.post('/update/:id', appointmentController.updateAppointment);
router.get('/delete/:id', appointmentController.deleteAppointment);

module.exports = router;
