const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');


const { validarCampos } = require('../middlewares/validar-campos');




const router = Router();

router.post('/', cargarArchivos);
router.put('/:coleccion/:id', [
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'])),
    check('id', 'El id no es válido').isMongoId(),
    validarCampos
],actualizarImagen);

module.exports = router;