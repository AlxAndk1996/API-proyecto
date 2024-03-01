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

router.get('/clientes', (req, res) => {
    mysqlConnection.query('SELECT * FROM clientes', (err,rows,fields) =>{
        if (!err) {
            res.status(200).json(rows);
        }else {
            console.log(err);
            res.status(500).json({message:"error en la optencion de los clientes"});
        }
    });
});

router.post('/clientes/buscar', (req, res) => {
    const { nombre, documento } = req.body;

    const sql = 'SELECT * FROM clientes WHERE nombre = ? AND documento = ?';

    mysqlConnection.query(sql, [nombre, documento], (err, result) => {
        if (!err) {
            if (result.length > 0) {
                // Cliente encontrado
                res.status(200).json({ message: "Bienvenido" });
            } else {
                // Cliente no encontrado
                res.status(404).json({ message: "Error: no estás registrado" });
            }
        } else {
            console.error(err);
            res.status(500).json({ message: "Error en la búsqueda del cliente" });
        }
    });
});


router.post('/registro', (req, res) => {
    const {id_cliente, nombre, apellidos, documento, telefono} = req.body;
    console.log(req.body)
    const insertarUsuario = 'CALL insertarCliente1(?,?,?,?,?);';

    mysqlConnection.query(insertarUsuario,[id_cliente, nombre, apellidos, documento, telefono], (err,rows, fields) => {
        if (!err) {
            res.json({Status: 'usuario agregado correctamente'});
        } else {
            console.log(err);
        }
    });
});

router.delete('/clientes/:id_cliente', (req, res) => {
    const {id_cliente} = req.params;
    mysqlConnection.query('DELETE FROM clientes WHERE id_cliente = ?', [id_cliente], (err, result) => {
        if (!err){
            if (result.affectedRows > 0){
                res.status(200).json({message: "cliente eliminado correctamente"});
            }
            else {
                res.status(404).json({message: "cliente no encontrado"});
            }
        }
        else {
            console.log(err);
            res.status(500).json({message: "error al eliminar el cliente"});
        }
    });
});

router.get('/clientes/:id_cliente', (req, res) => {
    const {id_cliente} = req.params;
    mysqlConnection.query('SELECT * FROM clientes WHERE id_cliente = ?', [id_cliente], (err, rows, fields) => {
        if (!err && rows.length > 0){
            res.status(200).json(rows[0]);
        }
        else if (rows.length === 0){
            res.status(404).json({message: "cliente no encontrado"});
        }
        else {
            console.log(err);
            res.status(500).json({message: "error al obtener el cliente"});
        }
    });
});

router.put('/clientes/:id_cliente', (req, res) => {
    
    const { nombre, apellidos, documento, telefono } = req.body;
    const {id_cliente} = req.params;
    
    const sql = 'CALL insertarCliente1(?, ?, ?, ?, ?)';
    
    mysqlConnection.query(sql, [id_cliente, nombre, apellidos, documento, telefono], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({ message: "Cliente actualizado correctamente" });    

        } else {
            console.error(err);
            res.status(500).json({ message: "Error en la actualización del cliente" });
        }
    });
});


const repartidorRoutes = require('./repartidor');
router.use(repartidorRoutes); router

const productosRoutes = require('./productos');
router.use(productosRoutes); router

module.exports = router;