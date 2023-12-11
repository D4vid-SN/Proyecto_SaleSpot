/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         tdoc:
 *           type: string
 *           description: Tipo de documento del usuario.
 *         id:
 *           type: string
 *           description: Identificación del usuario.
 *         password:
 *           type: string
 *           description: Contraseña del usuario.
 */

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Operaciones relacionadas con la autenticación de usuario
 */

/**
 * @swagger
 * /autenticacion:
 *   post:
 *     summary: Autenticar un usuario y generar un token JWT
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       '200':
 *         description: Éxito. Token JWT generado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       '400':
 *         description: Campos obligatorios faltantes o mal formato.
 *         content:
 *           application/json:
 *             example:
 *               error: Todos los campos obligatorios deben estar presentes
 *       '401':
 *         description: Credenciales incorrectas o usuario sin rol asignado.
 *         content:
 *           application/json:
 *             example:
 *               error: Contraseña incorrecta
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


const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/', (req, res) => {
  const { tdoc, id, password } = req.body;

  if (!tdoc || !id || !password) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  connection.query(
    'SELECT * FROM usuario WHERE tdoc_user = ? AND id_user = ?',
    [tdoc, id],
    (err, userResults) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el usuario' });
        return;
      }

      if (userResults.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      const storedPassword = userResults[0].pass_user;
      const storedRol = userResults[0].rol;

      // Verificar si la contraseña proporcionada coincide con la almacenada (ya sea encriptada o no)
      const isMatchEncrypted = bcrypt.compareSync(password, storedPassword);
      const isMatchUnencrypted = password === storedPassword;

      if ((isMatchEncrypted || isMatchUnencrypted) && storedRol) {
        // Contraseña válida y rol correcto, genera un token JWT
        const token = jwt.sign({ tdoc, id, rol: storedRol }, '12345', { expiresIn: '1h' });

        // Devuelve el token en la respuesta
        res.json({ token });
      } else {
        // Comprobar el motivo del fallo (rol incorrecto, contraseña incorrecta u otro)
        let errorMessage = '';
        if (!isMatchEncrypted && !isMatchUnencrypted) {
          errorMessage = 'Contraseña incorrecta';
        }
        if (!storedRol) {
          errorMessage = 'Usuario no tiene un rol asignado';
        }
        res.status(401).json({ error: errorMessage });
      }
    }
  );
});



module.exports = router;
