/**
 * @swagger
 * components:
 *   schemas:
 *     Rol:
 *       type: object
 *       properties:
 *         desc_rol:
 *           type: string
 *           description: Descripción del rol.
 */

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Operaciones relacionadas con roles
 */

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       '201':
 *         description: Rol creado con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: Rol creado con éxito
 *       '400':
 *         description: Campos obligatorios faltantes o mal formato
 *         content:
 *           application/json:
 *             example:
 *               error: La descripción del rol es obligatoria
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al crear el rol
 */

/**
 * @swagger
 * /roles/{id_rol}:
 *   get:
 *     summary: Consultar un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id_rol
 *         required: true
 *         description: Identificación del rol.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Éxito. Devuelve el rol solicitado.
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Rol'
 *       '404':
 *         description: Rol no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: Rol no encontrado
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al obtener el rol
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags: [Roles]
 *     responses:
 *       '200':
 *         description: Éxito. Devuelve una lista de todos los roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rol'
 *       '404':
 *         description: No se encontraron roles.
 *         content:
 *           application/json:
 *             example:
 *               error: No se encontraron roles
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al obtener los roles
 */

/**
 * @swagger
 * /roles/{id_rol}:
 *   put:
 *     summary: Actualizar un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id_rol
 *         required: true
 *         description: Identificación del rol.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       '200':
 *         description: Éxito. Rol actualizado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Rol actualizado con éxito
 *       '400':
 *         description: Campos obligatorios faltantes o mal formato.
 *         content:
 *           application/json:
 *             example:
 *               error: La descripción del rol es obligatoria
 *       '404':
 *         description: Rol no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: Rol no encontrado
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al actualizar el rol
 */

/**
 * @swagger
 * /roles/{id_rol}:
 *   delete:
 *     summary: Eliminar un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id_rol
 *         required: true
 *         description: Identificación del rol.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Éxito. Rol eliminado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Rol eliminado con éxito
 *       '404':
 *         description: Rol no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: Rol no encontrado
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al eliminar el rol
 */

/**
 * @swagger
 * /roles:
 *   delete:
 *     summary: Eliminar todos los roles
 *     tags: [Roles]
 *     responses:
 *       '200':
 *         description: Éxito. Todos los roles han sido eliminados con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Todos los roles han sido eliminados con éxito
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al eliminar todos los roles
 */


const express = require('express');
const router = express.Router();
const connection = require('../db');

// Crear un nuevo rol
router.post('/', (req, res) => {
  const { desc_rol } = req.body;

  if (!desc_rol) {
    return res.status(400).json({ error: 'La descripción del rol es obligatoria' });
  }

  connection.query(
    'INSERT INTO roles (desc_rol) VALUES (?)',
    [desc_rol],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el rol' });
        return;
      }
      res.status(201).json({ message: 'Rol creado con éxito' });
    }
  );
});

// Consultar un rol por su id_rol
router.get('/:id_rol', (req, res) => {
  const { id_rol } = req.params;

  connection.query(
    'SELECT * FROM roles WHERE id_rol = ?',
    [id_rol],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el rol' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Rol no encontrado' });
        return;
      }

      res.json(results[0]);
    }
  );
});


// Consultar todos los roles
router.get('/', (req, res) => {
  connection.query('SELECT * FROM roles', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener los roles' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'No se encontraron roles' });
      return;
    }

    res.json(results);
  });
});

// Actualizar un rol por su id_rol
router.put('/:id_rol', (req, res) => {
  const { id_rol } = req.params;
  const { desc_rol } = req.body;

  if (!desc_rol) {
    return res.status(400).json({ error: 'La descripción del rol es obligatoria' });
  }

  connection.query(
    'UPDATE roles SET desc_rol = ? WHERE id_rol = ?',
    [desc_rol, id_rol],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el rol' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Rol no encontrado' });
        return;
      }

      res.json({ message: 'Rol actualizado con éxito' });
    }
  );
});

// Eliminar un rol por su id_rol
router.delete('/:id_rol', (req, res) => {
  const { id_rol } = req.params;

  connection.query(
    'DELETE FROM roles WHERE id_rol = ?',
    [id_rol],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el rol' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Rol no encontrado' });
        return;
      }

      res.json({ message: 'Rol eliminado con éxito' });
    }
  );
});

// Eliminar todos los roles
router.delete('/', (req, res) => {
  connection.query('DELETE FROM roles', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar todos los roles' });
      return;
    }
    res.json({ message: 'Todos los roles han sido eliminados con éxito' });
  });
});


module.exports = router;
