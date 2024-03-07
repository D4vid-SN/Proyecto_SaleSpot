/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       properties:
 *         desc_prod:
 *           type: string
 *           description: Descripción del producto.
 *         tipo_prod:
 *           type: string
 *           description: Tipo de producto.
 *         valor_prod:
 *           type: number  # Cambiado a tipo de dato numérico
 *           description: Valor del producto.
 *         estado_prod:
 *           type: boolean
 *           description: Estado del producto (activo o inactivo).
 */

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Operaciones relacionadas con productos
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags:
 *       - Productos
 *     responses:
 *       '200':
 *         description: Éxito. Devuelve una lista de todos los productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al obtener los productos
 */

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificación del producto.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Éxito. Devuelve el producto solicitado.
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Producto'
 *       '404':
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: Producto no encontrado
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al obtener el producto
 */

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       '201':
 *         description: Producto creado con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: Producto creado con éxito
 *       '400':
 *         description: Campos obligatorios faltantes o mal formato
 *         content:
 *           application/json:
 *             example:
 *               error: Todos los campos son requeridos
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al crear el producto
 */

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificación del producto.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       '200':
 *         description: Éxito. Producto actualizado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Producto actualizado con éxito
 *       '400':
 *         description: Campos obligatorios faltantes o mal formato.
 *         content:
 *           application/json:
 *             example:
 *               error: Todos los campos son requeridos
 *       '404':
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: Producto no encontrado
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al actualizar el producto
 */

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificación del producto.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Éxito. Producto eliminado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Producto eliminado con éxito
 *       '404':
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: Producto no encontrado
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al eliminar el producto
 */

/**
 * @swagger
 * /productos:
 *   delete:
 *     summary: Eliminar todos los productos
 *     tags:
 *       - Productos
 *     responses:
 *       '200':
 *         description: Éxito. Todos los productos han sido eliminados con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Todos los productos han sido eliminados con éxito
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al eliminar todos los productos
 */



const express = require('express');
const router = express.Router();
const connection = require('../db');

// Obtener todos los productos
router.get('/', (req, res) => {
  connection.query('SELECT * FROM producto', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener los productos' });
      return;
    }
    res.json(results);
  });
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM producto WHERE id_prod = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener el producto' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    res.json(results[0]);
  });
});

// Crear un nuevo producto
router.post('/', (req, res) => {
  const { desc_prod, tipo_prod, valor_prod, estado_prod } = req.body;

  // Validar los campos requeridos
  if (!desc_prod || !tipo_prod || valor_prod === undefined || estado_prod === undefined) {
    res.status(400).json({ error: 'Todos los campos son requeridos' });
    return;
  }

  // Validar que estado_prod sea un valor booleano (true o false)
  if (typeof estado_prod !== 'boolean') {
    res.status(400).json({ error: 'El campo estado_prod debe ser booleano (true o false)' });
    return;
  }

  connection.query(
    'INSERT INTO producto (desc_prod, tipo_prod, valor_prod, estado_prod) VALUES (?, ?, ?, ?)',
    [desc_prod, tipo_prod, valor_prod, estado_prod],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el producto' });
        return;
      }
      res.status(201).json({ message: 'Producto creado con éxito' });
    }
  );
});


// Actualizar un producto
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { desc_prod, tipo_prod, valor_prod, estado_prod } = req.body;

  // Primero, verifica si el producto existe
  connection.query(
    'SELECT * FROM producto WHERE id_prod = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el producto' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      // Si el producto existe, procede a actualizarlo

      // Validar que estado_prod sea un valor booleano (true o false)
      if (estado_prod !== undefined && typeof estado_prod !== 'boolean') {
        res.status(400).json({ error: 'El campo estado_prod debe ser booleano (true o false)' });
        return;
      }

      // Construye la consulta de actualización según los campos proporcionados en la solicitud
      const updateQuery = 'UPDATE producto SET desc_prod = ?, tipo_prod = ?, valor_prod = ?, estado_prod = ? WHERE id_prod = ?';

      connection.query(
        updateQuery,
        [desc_prod, tipo_prod, valor_prod, estado_prod, id],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar el producto' });
            return;
          }
          res.json({ message: 'Producto actualizado con éxito' });
        }
      );
    }
  );
});


// Eliminar un producto por su id_prod
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  connection.query(
    'SELECT * FROM producto WHERE id_prod = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el producto' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      // Si el producto existe, procede a eliminarlo
      connection.query(
        'DELETE FROM producto WHERE id_prod = ?',
        [id],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar el producto' });
            return;
          }
          res.json({ message: 'Producto eliminado con éxito' });
        }
      );
    }
  );
});

// Eliminar todos los productos
router.delete('/', (req, res) => {
  connection.query('DELETE FROM producto', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar todos los productos' });
      return;
    }
    res.json({ message: 'Todos los productos han sido eliminados con éxito' });
  });
});

module.exports = router;

