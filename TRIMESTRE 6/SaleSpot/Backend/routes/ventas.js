/**
 * @swagger
 * components:
 *   schemas:
 *     Venta:
 *       type: object
 *       properties:
 *         n_venta:
 *           type: integer
 *           description: Número de venta.
 *         fecha_venta:
 *           type: string
 *           format: date
 *           description: Fecha de la venta (formato YYYY-MM-DD).
 *         subtotal:
 *           type: number
 *           description: Subtotal de la venta.
 *         iva:
 *           type: number
 *           description: Impuesto al valor agregado (IVA) de la venta.
 *         total_venta:
 *           type: number
 *           description: Total de la venta.
 *         id_prod:
 *           type: integer
 *           description: ID del producto vendido.
 *         tdoc_user:
 *           type: string
 *           description: Tipo de documento del usuario.
 *         id_user:
 *           type: string
 *           description: ID del usuario.
 *         cant_prod:
 *           type: integer
 *           description: Cantidad del producto vendido.
 *         valor_prod_cant:
 *           type: number
 *           description: Valor total del producto por la cantidad.
 */

/**
 * @swagger
 * tags:
 *   name: Ventas
 *   description: Operaciones relacionadas con las ventas
 */

/**
 * @swagger
 * /ventas:
 *   post:
 *     summary: Crear una nueva venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venta'
 *     responses:
 *       '201':
 *         description: Éxito. Venta creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venta'
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al crear la venta
 */

/**
 * @swagger
 * /ventas/{n_venta}:
 *   get:
 *     summary: Obtener una venta por su número de venta
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: n_venta
 *         required: true
 *         description: Número de venta a consultar
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Éxito. Venta obtenida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venta'
 *       '404':
 *         description: Venta no encontrada.
 *         content:
 *           application/json:
 *             example:
 *               error: Venta no encontrada
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al obtener la venta
 */

/**
 * @swagger
 * /ventas:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Ventas]
 *     responses:
 *       '200':
 *         description: Éxito. Lista de ventas obtenida.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venta'
 *       '404':
 *         description: No se encontraron ventas.
 *         content:
 *           application/json:
 *             example:
 *               error: No se encontraron ventas
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al obtener las ventas
 */

/**
 * @swagger
 * /ventas/{n_venta}:
 *   put:
 *     summary: Actualizar una venta por su número de venta
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: n_venta
 *         required: true
 *         description: Número de venta a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venta'
 *     responses:
 *       '200':
 *         description: Éxito. Venta actualizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venta'
 *       '404':
 *         description: Venta no encontrada.
 *         content:
 *           application/json:
 *             example:
 *               error: Venta no encontrada
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al actualizar la venta
 */

/**
 * @swagger
 * /ventas/{n_venta}:
 *   delete:
 *     summary: Eliminar una venta por su número de venta
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: n_venta
 *         required: true
 *         description: Número de venta a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Éxito. Venta eliminada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venta'
 *       '404':
 *         description: Venta no encontrada.
 *         content:
 *           application/json:
 *             example:
 *               error: Venta no encontrada
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al eliminar la venta
 */

/**
 * @swagger
 * /ventas:
 *   delete:
 *     summary: Eliminar todas las ventas
 *     tags: [Ventas]
 *     responses:
 *       '200':
 *         description: Éxito. Todas las ventas eliminadas con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venta'
 *       '404':
 *         description: No se encontraron ventas para eliminar.
 *         content:
 *           application/json:
 *             example:
 *               error: No se encontraron ventas para eliminar
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al eliminar todas las ventas
 */


const express = require('express');
const router = express.Router();
const connection = require('../db');

// Consultar una venta por su n_venta
router.get('/:n_venta', (req, res) => {
  const { n_venta } = req.params;

  connection.query(
    'SELECT * FROM ventas WHERE n_venta = ?',
    [n_venta],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener la venta' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Venta no encontrada' });
        return;
      }

      res.json(results[0]);
    }
  );
});

// Consultar todas las ventas
router.get('/', (req, res) => {
  connection.query('SELECT * FROM ventas', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener las ventas' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'No se encontraron ventas' });
      return;
    }

    res.json(results);
  });
});

// Crear una nueva venta
router.post('/', (req, res) => {
  const {
    fecha_venta,
    subtotal,
    iva,
    total_venta,
    id_prod,
    tdoc_user,
    id_user,
    cant_prod,
    valor_prod_cant
  } = req.body;

  connection.query(
    'INSERT INTO ventas (fecha_venta, subtotal, iva, total_venta, id_prod, tdoc_user, id_user, cant_prod, valor_prod_cant) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [fecha_venta, subtotal, iva, total_venta, id_prod, tdoc_user, id_user, cant_prod, valor_prod_cant],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear la venta', specificError: err.message });
        return;
      }
  
      if (result.affectedRows === 1) {
        res.status(201).json({ message: 'Venta creada con éxito' });
      } else {
        res.status(500).json({ error: 'No se pudo crear la venta' });
      }
    }
  );
  
});

// Actualizar una venta por su n_venta
router.put('/:n_venta', (req, res) => {
  const {
    fecha_venta,
    subtotal,
    iva,
    total_venta,
    id_prod,
    tdoc_user,
    id_user,
    cant_prod,
    valor_prod_cant
  } = req.body;
  const { n_venta } = req.params;

  // Primero, verifica si la venta existe
  connection.query(
    'SELECT * FROM ventas WHERE n_venta = ?',
    [n_venta],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar la venta' });
        return;
      }

      // Comprueba si se encontraron resultados (si la venta existe)
      if (results.length === 0) {
        res.status(404).json({ error: 'Venta no encontrada' });
        return;
      }

      // Si la venta existe, procede a actualizarla
      connection.query(
        'UPDATE ventas SET fecha_venta = ?, subtotal = ?, iva = ?, total_venta = ?, id_prod = ?, tdoc_user = ?, id_user = ?, cant_prod = ?, valor_prod_cant = ? WHERE n_venta = ?',
        [fecha_venta, subtotal, iva, total_venta, id_prod, tdoc_user, id_user, cant_prod, valor_prod_cant, n_venta],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar la venta' });
            return;
          }
          res.json({ message: 'Venta actualizada con éxito' });
        }
      );
    }
  );
});

// Eliminar una venta por su n_venta
router.delete('/:n_venta', (req, res) => {
  const { n_venta } = req.params;

  connection.query(
    'SELECT * FROM ventas WHERE n_venta = ?',
    [n_venta],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar la venta' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Venta no encontrada' });
        return;
      }

      // Si la venta existe, procede a eliminarla
      connection.query(
        'DELETE FROM ventas WHERE n_venta = ?',
        [n_venta],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar la venta' });
            return;
          }
          res.json({ message: 'Venta eliminada con éxito' });
        }
      );
    }
  );
});

// Eliminar todas las ventas
router.delete('/', (req, res) => {
  connection.query('DELETE FROM ventas', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar todas las ventas' });
      return;
    }
    res.json({ message: 'Todas las ventas han sido eliminadas con éxito' });
  });
});

module.exports = router;