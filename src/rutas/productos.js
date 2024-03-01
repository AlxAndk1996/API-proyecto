const express = require('express');
const router = express.Router();

const mysqlConnection = require('../karendb');


router.get('/id_cliente', (req, res) => {
    mysqlConnection.query('select * from clientes where id_clientes = ?',[id_cliente], (err,rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err)
        }
    });

});


router.post('/login', (req, res) => {
    const {nombre, documento} = req.params;
    mysqlConnection.query('select * from clientes where nombre = ? and documento = ?', [nombre, documento], (err,rows, fields) => {
        if (!err && rows.length > 0) {
            res.Status(200).json({messange: "inicio de sesion exitoso"});
        } else {
            res.Status(404).json({messange: "datos incorrectos"});
        }

    });

});

router.post('/registro', (req, res) => {
    const {id_cliente, nombre, apellidos, documento, telefono} = req.body;
    console.log(req.body)
    const insertarUsuario = 'CALL insertarCliente(?,?,?,?,?);';

    mysqlConnection.query(insertarUsuario,[id_cliente, nombre, apellidos, documento, telefono], (err,rows, fields) => {
        if (!err) {
            res.json({Status: 'usuario agregado correctamente'});
        } else {
            console.log(err);
        }
    });
});

module.exports = router;