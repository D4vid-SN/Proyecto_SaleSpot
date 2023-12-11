/**
 * @swagger
 * components:
 *   schemas:
 *     TipoProducto:
 *       type: object
 *       properties:
 *         id_tipo_prod:
 *           type: integer
 *           description: Identificador del tipo de producto.
 *         tipo_prod:
 *           type: string
 *           description: Descripción del tipo de producto.
 */

/**
 * @swagger
 * tags:
 *   name: Tipos de Producto
 *   description: Operaciones relacionadas con tipos de producto
 */

/**
 * @swagger
 * /tipos-producto:
 *   post:
 *     summary: Crear un nuevo tipo de producto
 *     tags: [Tipos de Producto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoProducto'
 *     responses:
 *       '201':
 *         description: Tipo de producto creado con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: Tipo de producto creado con éxito
 *       '400':
 *         description: Campos obligatorios faltantes o mal formato
 *         content:
 *           application/json:
 *             example:
 *               error: Todos los campos son obligatorios
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al crear el tipo de producto
 */

/**
 * @swagger
 * /tipos-producto/{id}:
 *   get:
 *     summary: Consultar un tipo de producto por su identificador
 *     tags: [Tipos de Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador del tipo de producto.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Éxito. Devuelve el tipo de producto solicitado.
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/TipoProducto'
 *       '404':
 *         description: Tipo de producto no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: Tipo de producto no encontrado
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al obtener el tipo de producto
 */

/**
 * @swagger
 * /tipos-producto:
 *   get:
 *     summary: Obtener todos los tipos de producto
 *     tags: [Tipos de Producto]
 *     responses:
 *       '200':
 *         description: Éxito. Devuelve una lista de todos los tipos de producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TipoProducto'
 *       '404':
 *         description: No se encontraron tipos de producto.
 *         content:
 *           application/json:
 *             example:
 *               error: No se encontraron tipos de producto
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al obtener los tipos de producto
 */

/**
 * @swagger
 * /tipos-producto/{id}:
 *   put:
 *     summary: Actualizar un tipo de producto por su identificador
 *     tags: [Tipos de Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador del tipo de producto.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoProducto'
 *     responses:
 *       '200':
 *         description: Éxito. Tipo de producto actualizado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Tipo de producto actualizado con éxito
 *       '400':
 *         description: Campos obligatorios faltantes o mal formato.
 *         content:
 *           application/json:
 *             example:
 *               error: La descripción del tipo de producto es obligatoria
 *       '404':
 *         description: Tipo de producto no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: Tipo de producto no encontrado
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al actualizar el tipo de producto
 */

/**
 * @swagger
 * /tipos-producto/{id}:
 *   delete:
 *     summary: Eliminar un tipo de producto por su identificador
 *     tags: [Tipos de Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador del tipo de producto.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Éxito. Tipo de producto eliminado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Tipo de producto eliminado con éxito
 *       '404':
 *         description: Tipo de producto no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: Tipo de producto no encontrado
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al eliminar el tipo de producto
 */

/**
 * @swagger
 * /tipos-producto:
 *   delete:
 *     summary: Eliminar todos los tipos de producto
 *     tags: [Tipos de Producto]
 *     responses:
 *       '200':
 *         description: Éxito. Todos los tipos de producto han sido eliminados con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Todos los tipos de producto han sido eliminados con éxito
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al eliminar todos los tipos de producto
 */


const express = require('express');
const router = express.Router();
const connection = require('../db');

// Consultar un tipo de producto por su id_tipo_prod
router.get('/:id', (req, res) => {
  const { id } = req.params;

  connection.query('SELECT * FROM tipo_producto WHERE id_tipo_prod = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener el tipo de producto' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Tipo de producto no encontrado' });
      return;
    }

    res.json(results[0]);
  });
});

// Consultar todos los tipos de producto
router.get('/', (req, res) => {
  connection.query('SELECT * FROM tipo_producto', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener los tipos de producto' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'No se encontraron tipos de producto' });
      return;
    }

    res.json(results);
  });
});

// Crear un nuevo tipo de producto
router.post('/', (req, res) => {
  const { tipo_prod } = req.body;
  connection.query(
    'INSERT INTO tipo_producto (tipo_prod) VALUES (?)',
    [tipo_prod],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el tipo de producto' });
        return;
      }
      res.status(201).json({ message: 'Tipo de producto creado con éxito' });
    }
  );
});

// Actualizar un tipo de producto
router.put('/:id', (req, res) => {
  const { tipo_prod } = req.body;
  const { id } = req.params;

  // Primero, verifica si el tipo de producto existe
  connection.query(
    'SELECT * FROM tipo_producto WHERE id_tipo_prod = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el tipo de producto' });
        return;
      }

      // Comprueba si se encontraron resultados (si el tipo de producto existe)
      if (results.length === 0) {
        res.status(404).json({ error: 'Tipo de producto no encontrado' });
        return;
      }

      // Si el tipo de producto existe, procede a actualizarlo
      connection.query(
        'UPDATE tipo_producto SET tipo_prod = ? WHERE id_tipo_prod = ?',
        [tipo_prod, id],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar el tipo de producto' });
            return;
          }
          res.json({ message: 'Tipo de producto actualizado con éxito' });
        }
      );
    }
  );
});

// Eliminar un tipo de producto por su id_tipo_prod
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  connection.query(
    'SELECT * FROM tipo_producto WHERE id_tipo_prod = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el tipo de producto' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Tipo de producto no encontrado' });
        return;
      }

      // Si el tipo de producto existe, procede a eliminarlo
      connection.query(
        'DELETE FROM tipo_producto WHERE id_tipo_prod = ?',
        [id],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar el tipo de producto' });
            return;
          }
          res.json({ message: 'Tipo de producto eliminado con éxito' });
        }
      );
    }
  );
});

// Eliminar todos los tipos de productos
router.delete('/', (req, res) => {
  connection.query('DELETE FROM tipo_producto', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar todos los tipos de producto' });
      return;
    }
    res.json({ message: 'Todos los tipos de productos han sido eliminados con éxito' });
  });
});


module.exports = router;
