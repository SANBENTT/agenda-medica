const db = require('../config/configdb.js');

class Appointment {
    static getAllAppointments(callback) {
        db.query('SELECT * FROM appointments', callback);
    }

    static addAppointment(appointment, callback) {
        db.query(
            'INSERT INTO appointments (doctor_id, patient_name, patient_dni, appointment_date, appointment_time, reason, status) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [appointment.doctor_id, appointment.patient_name, appointment.patient_dni, appointment.appointment_date, appointment.appointment_time, appointment.reason, appointment.status], 
            callback
        );
    }

    static getAppointmentById(id, callback) {
        const query = 'SELECT * FROM appointments WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    }

    static updateAppointment(id, appointment, callback) {
        const query = `UPDATE appointments 
                       SET doctor_id = ?, patient_name = ?, patient_dni = ?, 
                           appointment_date = ?, appointment_time = ?, reason = ?, status = ? 
                       WHERE id = ?`;
        const values = [
            appointment.doctor_id,
            appointment.patient_name,
            appointment.patient_dni,
            appointment.appointment_date,
            appointment.appointment_time,
            appointment.reason,
            appointment.status,
            id,
        ];
        db.query(query, values, callback);
    }

    static deleteAppointment(id, callback) {
        db.query('DELETE FROM appointments WHERE id = ?', [id], callback);
    }
}

module.exports = Appointment;
