/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         tdoc_user:
 *           type: string
 *           description: Tipo de documento del usuario.
 *         id_user:
 *           type: integer  # Cambiado a tipo de dato numérico
 *           description: Identificación del usuario.
 *         nombre_1:
 *           type: string
 *           description: Primer nombre del usuario.
 *         nombre_2:
 *           type: string
 *           description: Segundo nombre del usuario.
 *         apellido_1:
 *           type: string
 *           description: Primer apellido del usuario.
 *         apellido_2:
 *           type: string
 *           description: Segundo apellido del usuario.
 *         email:
 *           type: string
 *           format: email
 *           description: Dirección de correo electrónico del usuario.
 *         rol:
 *           type: string
 *           enum: [administrador, empleado]
 *           description: Rol del usuario.
 *         estado:
 *           type: boolean
 *           description: Estado del usuario.
 *         pass_user:
 *           type: string
 *           description: Contraseña generada automáticamente para el usuario.
 */

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       '201':
 *         description: Usuario creado con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: Usuario creado con éxito
 *               password: [contraseña generada automáticamente]
 *       '400':
 *         description: Campos obligatorios faltantes o mal formato
 *         content:
 *           application/json:
 *             example:
 *               error: Todos los campos obligatorios deben estar presentes, y el campo estado debe ser booleano
 *       '404':
 *         description: Tipo de documento, rol o usuario no encontrados
 *         content:
 *           application/json:
 *             example:
 *               error: Tipo de documento no encontrado
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags:
 *       - Usuarios
 *     responses:
 *       '200':
 *         description: Éxito. Devuelve una lista de todos los usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       '404':
 *         description: No se encontraron usuarios.
 *         content:
 *           application/json:
 *             example:
 *               error: No se encontraron usuarios
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al obtener los usuarios
 */

/**
 * @swagger
 * /usuarios:
 *   delete:
 *     summary: Eliminar todos los usuarios
 *     tags:
 *       - Usuarios
 *     responses:
 *       '200':
 *         description: Éxito. Todos los usuarios han sido eliminados con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Todos los usuarios han sido eliminados con éxito
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al eliminar todos los usuarios
 */

/**
 * @swagger
 * /usuarios/{tdoc_user}/{id_user}:
 *   get:
 *     summary: Consultar un usuario por tipo de documento y ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: tdoc_user
 *         required: true
 *         description: Tipo de documento del usuario.
 *         schema:
 *           type: string
 *       - in: path
 *         name: id_user
 *         required: true
 *         description: Identificación del usuario.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Éxito. Devuelve el usuario solicitado.
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Usuario'
 *       '404':
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: Usuario no encontrado
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al obtener el usuario
 */

/**
 * @swagger
 * /usuarios/{tdoc_user}/{id_user}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: tdoc_user
 *         required: true
 *         description: Tipo de documento del usuario.
 *         schema:
 *           type: string
 *       - in: path
 *         name: id_user
 *         required: true
 *         description: Identificación del usuario.
 *         schema:
 *           type: integer  # Cambiado a tipo de dato numérico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       '200':
 *         description: Éxito. Usuario actualizado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Usuario actualizado con éxito
 *       '400':
 *         description: Campos obligatorios faltantes o mal formato.
 *         content:
 *           application/json:
 *             example:
 *               error: Los campos obligatorios deben estar presentes y el campo estado debe ser booleano
 *       '404':
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: Usuario no encontrado
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al actualizar el usuario
 */


/**
 * @swagger
 * /usuarios/{tdoc_user}/{id_user}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: tdoc_user
 *         required: true
 *         description: Tipo de documento del usuario.
 *         schema:
 *           type: string
 *       - in: path
 *         name: id_user
 *         required: true
 *         description: Identificación del usuario.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Éxito. Usuario eliminado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Usuario eliminado con éxito
 *       '404':
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: Usuario no encontrado
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: Error al eliminar el usuario
 */



const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');

// Generar una contraseña aleatoria
const generateRandomPassword = () => {
  const randomPassword = Math.random().toString(36).substring(2, 10); // Genera una contraseña de 8 caracteres
  return randomPassword;
};

// Crear un nuevo usuario (que puede ser administrador o empleado) con contraseña generada automáticamente
router.post('/', (req, res) => {
  const { tdoc_user, id_user, nombre_1, nombre_2, apellido_1, apellido_2, email, rol, estado } = req.body;

  // Generar una contraseña aleatoria
  const pass_user = generateRandomPassword();

  if (!tdoc_user || !id_user || !nombre_1 || !apellido_1 || !email || typeof estado !== 'boolean') {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes, y el campo estado debe ser booleano' });
  }

  // Validar que el tipo de documento exista
  connection.query(
    'SELECT * FROM tipo_documento WHERE tdoc = ?',
    [tdoc_user],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al verificar el tipo de documento' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Tipo de documento no encontrado' });
        return;
      }

      // Validar que el rol exista y sea "administrador" o "empleado"
      connection.query(
        'SELECT * FROM roles WHERE id_rol = ? AND (desc_rol = "administrador" OR desc_rol = "empleado")',
        [rol],
        (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al verificar el rol' });
            return;
          }

          if (results.length === 0) {
            res.status(404).json({ error: 'Rol no encontrado o no es un rol válido' });
            return;
          }

          // Si el tipo de documento, el rol y el estado son válidos, procede a crear el usuario
          connection.query(
            'INSERT INTO usuario (tdoc_user, id_user, nombre_1, nombre_2, apellido_1, apellido_2, email, rol, estado, pass_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [tdoc_user, id_user, nombre_1, nombre_2, apellido_1, apellido_2, email, rol, estado, pass_user],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al crear el usuario' });
                return;
              }
              res.status(201).json({ message: 'Usuario creado con éxito', password: pass_user });
            }
          );
        }
      );
    }
  );
});

// Consultar un usuario por su tdoc_user e id_user
router.get('/:tdoc_user/:id_user', (req, res) => {
  const { tdoc_user, id_user } = req.params;

  connection.query(
    'SELECT * FROM usuario WHERE tdoc_user = ? AND id_user = ?',
    [tdoc_user, id_user],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el usuario' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      res.json(results[0]);
    }
  );
});

// Consultar todos los usuarios
router.get('/', (req, res) => {
  connection.query('SELECT * FROM usuario', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'No se encontraron usuarios' });
      return;
    }

    res.json(results);
  });
});

// Actualizar un usuario (excluyendo pass_user)
router.put('/:tdoc_user/:id_user', (req, res) => {
  const { tdoc_user, id_user } = req.params;
  const { nombre_1, nombre_2, apellido_1, apellido_2, email, rol, estado } = req.body;

  if (!nombre_1 || !apellido_1 || !email || typeof estado !== 'boolean') {
    return res.status(400).json({ error: 'Los campos obligatorios deben estar presentes y el campo estado debe ser booleano' });
  }

  // Validar que el usuario exista
  connection.query(
    'SELECT * FROM usuario WHERE tdoc_user = ? AND id_user = ?',
    [tdoc_user, id_user],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al verificar el usuario' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      // Validar que el rol exista y sea "administrador" o "empleado"
      connection.query(
        'SELECT * FROM roles WHERE id_rol = ? AND (desc_rol = "administrador" OR desc_rol = "empleado")',
        [rol],
        (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al verificar el rol' });
            return;
          }

          if (results.length === 0) {
            res.status(404).json({ error: 'Rol no encontrado o no es un rol válido' });
            return;
          }

          // Si el usuario existe, el rol es válido y el estado es booleano, procede a actualizar los demás campos
          connection.query(
            'UPDATE usuario SET nombre_1 = ?, nombre_2 = ?, apellido_1 = ?, apellido_2 = ?, email = ?, rol = ?, estado = ? WHERE tdoc_user = ? AND id_user = ?',
            [nombre_1, nombre_2, apellido_1, apellido_2, email, rol, estado, tdoc_user, id_user],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al actualizar el usuario' });
                return;
              }
              res.json({ message: 'Usuario actualizado con éxito' });
            }
          );
        }
      );
    }
  );
});

// Eliminar un usuario por su tdoc_user e id_user
router.delete('/:tdoc_user/:id_user', (req, res) => {
  const { tdoc_user, id_user } = req.params;

  connection.query(
    'DELETE FROM usuario WHERE tdoc_user = ? AND id_user = ?',
    [tdoc_user, id_user],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      res.json({ message: 'Usuario eliminado con éxito' });
    }
  );
});

// Eliminar todos los usuarios
router.delete('/', (req, res) => {
  connection.query('DELETE FROM usuario', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar todos los usuarios' });
      return;
    }
    res.json({ message: 'Todos los usuarios han sido eliminados con éxito' });
  });
});

module.exports = router;


