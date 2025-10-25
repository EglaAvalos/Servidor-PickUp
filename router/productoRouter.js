const express = require('express');
const router = express.Router();
const productoController = require('../controller/productoController');


router.get('/producto', productoController.getAllProductos);
router.get('/producto/:id', productoController.getProductoById);
router.post('/producto/', productoController.addProducto);
router.put('/producto/:id',productoController .updateProducto);
router.delete('/producto/:id', productoController.deleteProducto);

module.exports = router;