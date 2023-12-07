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
