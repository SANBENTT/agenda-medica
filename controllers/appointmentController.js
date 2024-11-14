const Appointment = require('../models/appointments.js');
const db = require('../config/configdb.js');

exports.getAppointments = (req, res) => {
    Appointment.getAllAppointments((err, results) => {
        if (err) throw err;
        res.render('appointments', { appointments: results });
    });
};

exports.addAppointment = async (req, res) => {
    const { doctor_id, patient_name, patient_dni, appointment_date, appointment_time, reason, status } = req.body;

    try {
        
        const [existingAppointments] = await db.promise().query(
            'SELECT * FROM appointments WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ? AND status != "canceled"',
            [doctor_id, appointment_date, appointment_time]
        );

        if (existingAppointments.length > 0) {
            return res.status(400).send("El horario ya está ocupado para este doctor.");
        }

        
        await db.promise().query(
            'INSERT INTO appointments (doctor_id, patient_name, patient_dni, appointment_date, appointment_time, reason, status) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [doctor_id, patient_name, patient_dni, appointment_date, appointment_time, reason, status]
        );

        res.redirect('/appointments');
    } catch (error) {
        console.error("Error al agregar la cita:", error);
        res.status(500).send("Hubo un problema al agregar la cita.");
    }
};


exports.editAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const [appointmentResult] = await db.promise().query('SELECT * FROM appointments WHERE id = ?', [id]);
        const appointment = appointmentResult[0];

        if (!appointment) {
            return res.status(404).send("cita no funciona");
        }

        res.render('editAppointment', { appointment });
    } catch (error) {
        console.error("Error al agregar la cita", error);
        res.status(500).send("Hubo un problema al agregar la cita.");
    }
};

exports.updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { date, time, doctor_id, patient_name, patient_dni, reason, status } = req.body;

    try {
        
        const [existingAppointments] = await db.promise().query(
            'SELECT * FROM appointments WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ? AND id != ? AND status != "canceled"',
            [doctor_id, date, time, id]
        );

        if (existingAppointments.length > 0) {
            return res.status(400).send("El horario ya está ocupado para este doctor.");
        }

        
        const updatedAppointment = {
            appointment_date: date,
            appointment_time: time,
            doctor_id,
            patient_name,
            patient_dni,
            reason,
            status,
        };

        await Appointment.updateAppointment(id, updatedAppointment);
        res.redirect('/appointments');
    } catch (error) {
        console.error("Error al actualizar la cita:", error);
        res.status(500).send("Error al actualizar la cita.");
    }
};


exports.deleteAppointment = (req, res) => {
    const id = req.params.id;
    Appointment.deleteAppointment(id, (err) => {
        if (err) throw err;
        res.redirect('/appointments');
    });
};
