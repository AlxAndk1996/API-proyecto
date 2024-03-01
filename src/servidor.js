const express = require('express');
const app = express();

//ajustes
app.set('port', process.env.PORT || 5500);

//middlewares
app.use(express.json());

//routes
app.use(require('./rutas/clientes'));


//inicializar servidor
app.listen(app.get('port'), () => {
    console.log('servidor activo en puerto', app.get('port'));
});