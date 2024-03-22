const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const swagger = require('./swagger');

// Middleware para servir la documentación de Swagger
app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.specs));

app.use(express.json());
app.use(cors());

const tipoDocumentoRoutes = require('./routes/tipoDocumento');
app.use('/tipoDocumento', tipoDocumentoRoutes);

const rolesRoutes = require('./routes/roles');
app.use('/roles', rolesRoutes);

const usuariosRoutes = require('./routes/usuarios');
app.use('/usuarios', usuariosRoutes);

const loginRoutes = require('./routes/login');
app.use('/login', loginRoutes);

const passwordUpdateRoutes = require('./routes/passwordUpdate');
app.use('/passwordUpdate', passwordUpdateRoutes);

const tipoProductoRoutes = require('./routes/tipoProducto');
app.use('/tipoProducto', tipoProductoRoutes);

const productoRoutes = require('./routes/producto');
app.use('/producto', productoRoutes)

const ventasRouter = require('./routes/ventas');
app.use('/ventas', ventasRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});