const express = require('express');
const pug=require('pug');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Configuracion de Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const indexRouter = require('./routes/index');
const appointmentsRouter = require('./routes/appointmentsRoutes');
const doctorsRouter = require('./routes/doctorsRoutes');

app.use('/', indexRouter);
app.use('/appointments', appointmentsRouter);
app.use('/doctors', doctorsRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});