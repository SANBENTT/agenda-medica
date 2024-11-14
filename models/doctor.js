const db = require('../config/configdb.js');

class Doctor {
    static getDoctorById(id, callback) {
        const query = 'SELECT * FROM doctors WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    }

    static getAllDoctors(callback) {
        db.query('SELECT * FROM doctors', callback);
    }

    static addDoctor(doctor, callback) {
        db.query('INSERT INTO doctors (name, license_number, specialties, status) VALUES (?, ?, ?, ?)', 
        [doctor.name, doctor.license_number, doctor.specialties, doctor.status], callback);
    }

    static updateDoctor(id, doctor, callback) {
        db.query('UPDATE doctors SET name = ?, license_number = ?, specialties = ?, status = ? WHERE id = ?', 
        [doctor.name, doctor.license_number, doctor.specialties, doctor.status, id], callback);
    }
    

    static deleteDoctor(id, callback) {
        db.query('DELETE FROM doctors WHERE id = ?', [id], callback);
    }
}

module.exports = Doctor;