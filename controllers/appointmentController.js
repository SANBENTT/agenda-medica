const Appointment = require('../models/appointments.js');
const db = require('../config/configdb.js');

exports.getAppointments = (req, res) => {
    Appointment.getAllAppointments((err, results) => {
        if (err) throw err;
        res.render('appointments', { appointments: results });
    });
};

exports.addAppointment = (req, res) => {
    const newAppointment = req.body;
    Appointment.addAppointment(newAppointment, (err) => {
        if (err) throw err;
        res.redirect('/appointments');
    });
};

exports.editAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const [appointmentResult] = await db.query('SELECT * FROM appointments WHERE id = ?', [id]);
        const appointment = appointmentResult[0];

        if (!appointment) {
            return res.status(404).send("Appointment not found");
        }

        res.render('editAppointment', { appointment });
    } catch (error) {
        console.error("Error retrieving appointment:", error);
        res.status(500).send("Error retrieving appointment data");
    }
};


exports.updateAppointment = (req, res) => {
    const { id } = req.params;
    const { date, time, doctor_id, patient_name, patient_dni, reason, status } = req.body;

    const updatedAppointment = {
        appointment_date: date,
        appointment_time: time,
        doctor_id,
        patient_name,
        patient_dni,
        reason,
        status,
    };

    Appointment.updateAppointment(id, updatedAppointment, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error updating appointment");
        }
        res.redirect('/appointments');
    });
};

exports.deleteAppointment = (req, res) => {
    const id = req.params.id;
    Appointment.deleteAppointment(id, (err) => {
        if (err) throw err;
        res.redirect('/appointments');
    });
};
