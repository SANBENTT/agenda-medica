const db = require('../config/configdb.js'); 
const Doctor = require('../models/doctor.js');

exports.getDoctors = (req, res) => {
    Doctor.getAllDoctors((err, results) => {
        if (err) throw err;
        res.render('doctors', { doctors: results });
    });
};

exports.addDoctor = (req, res) => {
    const newDoctor = req.body;
    Doctor.addDoctor(newDoctor, (err) => {
        if (err) throw err;
        res.redirect('/doctors');
    });
};

// Metodo para editar médico
exports.editDoctor = async (req, res) => {
    const { id } = req.params;
    try {
        const [doctor] = await db.promise().query('SELECT * FROM doctors WHERE id = ?', [id]);
        if (doctor.length === 0) return res.status(404).send("Doctor not found");
        res.render('editDoctor', { doctor: doctor[0] });
    } catch (error) {
        res.status(500).send("Error retrieving doctor data");
    }
};

// Metodo para actualizar los datos del doctor
exports.updateDoctor = async (req, res) => {
    const { id } = req.params;
    const { name, specialty, status } = req.body;  
    try {
        await db.promise().query('UPDATE doctors SET name = ?, specialties = ?, status = ? WHERE id = ?', [name, specialty, status, id]);
        res.redirect('/doctors');
    } catch (error) {
        console.error(error);  
        res.status(500).send("Error updating doctor");
    }
};

exports.deleteDoctor = (req, res) => {
    const id = req.params.id;
    Doctor.deleteDoctor(id, (err) => {
        if (err) throw err;
        res.redirect('/doctors');
    });
};
