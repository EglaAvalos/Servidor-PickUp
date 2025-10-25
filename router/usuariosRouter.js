const express = require('express');
const router = express.Router();
const studentController = require('../controller/usuarioController');


router.get('/usuario', usuarioController.getAllUsuarios);
router.get('/usuario/:id', usuarioController.getUsuarioById);
router.post('/usuario/', usuarioController.addUsuario);
router.put('/usuario/:id',usuarioController .updateUsuario);
router.delete('/usuario/:id', usuarioController.deleteUsuario);

module.exports = router;