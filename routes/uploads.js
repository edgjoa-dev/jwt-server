const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actualizarImagen, mostrarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');


const { validarCampos, validarArchivoSubir } = require('../middlewares');




const router = Router();

router.post('/', validarArchivoSubir, cargarArchivos);


router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id no es válido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios','productos'])),
    validarCampos
],actualizarImagen);


router.get('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id no es válido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios','productos'])),
    validarCampos
],mostrarImagen);

module.exports = router;