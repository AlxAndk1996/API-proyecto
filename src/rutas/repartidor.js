const express = require('express');
const router = express.Router();
const mysqlConnection = require('../karendb');


// Ruta para obtener todos los repartidores
router.get('/domiciliario', (req, res) => {
    mysqlConnection.query('SELECT * FROM repartidor', (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows); // Retorna todos los datos de los repartidores en formato JSON
        } else {
            console.log(err);
            res.status(500).json({ message: "Error al obtener repartidores" });
        }
    });
});

module.exports = router;
