/**
 * @swagger
 * components:
 *   schemas:
 *     TipoDocumento:
 *       type: object
 *       properties:
 *         tdoc:
 *           type: string
 *           description: Código del tipo de documento.
 *         desc_tdoc:
 *           type: string
 *           description: Descripción del tipo de documento.
 */

/**
 * @swagger
 * tags:
 *   name: Tipos de Documento
 *   description: Operaciones relacionadas con tipos de documento
 */

/**
 * @swagger
 * /tipos-documento:
 *   post:
 *     summary: Crear un nuevo tipo de documento
 *     tags: [Tipos de Documento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoDocumento'
 *     responses:
 *       '201':
 *         description: Tipo de documento creado con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: Tipo de documento creado con éxito
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
 *               error: Error al crear el tipo de documento
 */

/**
 * @swagger
 * /tipos-documento/{tdoc}:
 *   get:
 *     summary: Consultar un tipo de documento por su código (tdoc)
 *     tags: [Tipos de Documento]
 *     parameters:
 *       - in: path
 *         name: tdoc
 *         required: true
 *         description: Código del tipo de documento.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Éxito. Devuelve el tipo de documento solicitado.
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/TipoDocumento'
 *       '404':
 *         description: Tipo de documento no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: Tipo de documento no encontrado
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al obtener el tipo de documento
 */

/**
 * @swagger
 * /tipos-documento:
 *   get:
 *     summary: Obtener todos los tipos de documento
 *     tags: [Tipos de Documento]
 *     responses:
 *       '200':
 *         description: Éxito. Devuelve una lista de todos los tipos de documento.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TipoDocumento'
 *       '404':
 *         description: No se encontraron tipos de documento.
 *         content:
 *           application/json:
 *             example:
 *               error: No se encontraron tipos de documento
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al obtener los tipos de documento
 */

/**
 * @swagger
 * /tipos-documento/{tdoc}:
 *   put:
 *     summary: Actualizar un tipo de documento por su código (tdoc)
 *     tags: [Tipos de Documento]
 *     parameters:
 *       - in: path
 *         name: tdoc
 *         required: true
 *         description: Código del tipo de documento.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoDocumento'
 *     responses:
 *       '200':
 *         description: Éxito. Tipo de documento actualizado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Tipo de documento actualizado con éxito
 *       '400':
 *         description: Campos obligatorios faltantes o mal formato.
 *         content:
 *           application/json:
 *             example:
 *               error: La descripción del tipo de documento es obligatoria
 *       '404':
 *         description: Tipo de documento no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: Tipo de documento no encontrado
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al actualizar el tipo de documento
 */

/**
 * @swagger
 * /tipos-documento/{tdoc}:
 *   delete:
 *     summary: Eliminar un tipo de documento por su código (tdoc)
 *     tags: [Tipos de Documento]
 *     parameters:
 *       - in: path
 *         name: tdoc
 *         required: true
 *         description: Código del tipo de documento.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Éxito. Tipo de documento eliminado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Tipo de documento eliminado con éxito
 *       '404':
 *         description: Tipo de documento no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: Tipo de documento no encontrado
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al eliminar el tipo de documento
 */

/**
 * @swagger
 * /tipos-documento:
 *   delete:
 *     summary: Eliminar todos los tipos de documento
 *     tags: [Tipos de Documento]
 *     responses:
 *       '200':
 *         description: Éxito. Todos los tipos de documento han sido eliminados con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Todos los tipos de documento han sido eliminados con éxito
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al eliminar todos los tipos de documento
 */


const express = require('express');
const router = express.Router();
const connection = require('../db');

// Crear un nuevo tipo de documento
router.post('/', (req, res) => {
  const { tdoc, desc_tdoc } = req.body;

  if (!tdoc || !desc_tdoc) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  connection.query(
    'INSERT INTO tipo_documento (tdoc, desc_tdoc) VALUES (?, ?)',
    [tdoc, desc_tdoc],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el tipo de documento' });
        return;
      }
      res.status(201).json({ message: 'Tipo de documento creado con éxito' });
    }
  );
});

// Consultar un tipo de documento por su tdoc
router.get('/:tdoc', (req, res) => {
  const { tdoc } = req.params;

  connection.query(
    'SELECT * FROM tipo_documento WHERE tdoc = ?',
    [tdoc],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el tipo de documento' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Tipo de documento no encontrado' });
        return;
      }

      res.json(results[0]);
    }
  );
});


// Consultar todos los tipos de documento
router.get('/', (req, res) => {
  connection.query('SELECT * FROM tipo_documento', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener los tipos de documento' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'No se encontraron tipos de documento' });
      return;
    }

    res.json(results);
  });
});

// Actualizar un tipo de documento por su tdoc
router.put('/:tdoc', (req, res) => {
  const { tdoc } = req.params;
  const { desc_tdoc } = req.body;

  if (!desc_tdoc) {
    return res.status(400).json({ error: 'La descripción del tipo de documento es obligatoria' });
  }

  connection.query(
    'UPDATE tipo_documento SET desc_tdoc = ? WHERE tdoc = ?',
    [desc_tdoc, tdoc],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el tipo de documento' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Tipo de documento no encontrado' });
        return;
      }

      res.json({ message: 'Tipo de documento actualizado con éxito' });
    }
  );
});

// Eliminar un tipo de documento por su tdoc
router.delete('/:tdoc', (req, res) => {
  const { tdoc } = req.params;

  connection.query(
    'DELETE FROM tipo_documento WHERE tdoc = ?',
    [tdoc],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el tipo de documento' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Tipo de documento no encontrado' });
        return;
      }

      res.json({ message: 'Tipo de documento eliminado con éxito' });
    }
  );
});

// Eliminar todos los tipos de documento
router.delete('/', (req, res) => {
  connection.query('DELETE FROM tipo_documento', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar todos los tipos de documento' });
      return;
    }
    res.json({ message: 'Todos los tipos de documento han sido eliminados con éxito' });
  });
});


module.exports = router;
