/**
 * @swagger
 * components:
 *   schemas:
 *     PasswordUpdate:
 *       type: object
 *       properties:
 *         current_pass:
 *           type: string
 *           description: Contraseña actual del usuario.
 *         new_pass:
 *           type: string
 *           description: Nueva contraseña del usuario.
 */

/**
 * @swagger
 * tags:
 *   name: Cambio de Contraseña
 *   description: Operaciones relacionadas con el cambio de contraseña de usuario
 */

/**
 * @swagger
 * /cambio-contrasena/{tdoc}/{id}:
 *   put:
 *     summary: Cambiar la contraseña de un usuario
 *     tags: [Cambio de Contraseña]
 *     parameters:
 *       - in: path
 *         name: tdoc
 *         required: true
 *         description: Tipo de documento del usuario.
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificación del usuario.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       '200':
 *         description: Éxito. Contraseña cambiada con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Contraseña cambiada con éxito
 *       '400':
 *         description: Campos obligatorios faltantes o mal formato.
 *         content:
 *           application/json:
 *             example:
 *               error: Los campos de contraseña actual y nueva contraseña son obligatorios
 *       '401':
 *         description: Contraseña actual incorrecta.
 *         content:
 *           application/json:
 *             example:
 *               error: Contraseña actual incorrecta
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
 *               error: Error al cambiar la contraseña del usuario
 */


const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');

router.put('/:tdoc/:id', (req, res) => {
  const { tdoc, id } = req.params;
  const { current_pass, new_pass } = req.body;

  if (!current_pass || !new_pass) {
    return res.status(400).json({ error: 'Los campos de contraseña actual y nueva contraseña son obligatorios' });
  }

  const isUserQuery = 'SELECT * FROM usuario WHERE tdoc_user = ? AND id_user = ?';

  connection.query(isUserQuery, [tdoc, id], (err, userResults) => {
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

    // Verificar si la contraseña actual proporcionada coincide con la almacenada (ya sea encriptada o no)
    const isMatchEncrypted = bcrypt.compareSync(current_pass, storedPassword);
    const isMatchUnencrypted = current_pass === storedPassword;

    if ((isMatchEncrypted || isMatchUnencrypted)) {
      // Generar una sal (salt) para encriptar la nueva contraseña
      const saltRounds = 10;

      // Encriptar la nueva contraseña
      bcrypt.hash(new_pass, saltRounds, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error al encriptar la nueva contraseña' });
          return;
        }

        // Actualizar la contraseña en la base de datos
        const updateQuery = 'UPDATE usuario SET pass_user = ? WHERE tdoc_user = ? AND id_user = ?';
        const params = [hashedPassword, tdoc, id];

        connection.query(updateQuery, params, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al cambiar la contraseña del usuario' });
            return;
          }
          res.json({ message: 'Contraseña cambiada con éxito' });
        });
      });
    } else {
      res.status(401).json({ error: 'Contraseña actual incorrecta' });
    }
  });
});


module.exports = router;
