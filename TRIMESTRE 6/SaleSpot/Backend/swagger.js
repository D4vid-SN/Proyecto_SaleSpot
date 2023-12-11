const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API SaleSpot',
      version: '1.0.0',
      description: 'Documentación de la API',
    },
  },
  apis: ['./routes/usuarios.js', 
        './routes/producto.js', 
        './routes/roles.js', 
        './routes/tipoDocumento.js',
        './routes/tipoProducto.js',
        './routes/passwordUpdate.js',
        './routes/login.js',
        './routes/factura.js',
        './routes/facturaProducto.js',
        './routes/ventas.js',
    ], 
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
