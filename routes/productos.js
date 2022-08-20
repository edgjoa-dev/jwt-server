const { Router } = require('express');

const { check } = require('express-validator');
const {

    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto,

} = require('../controllers/productos');


const { existeProductoPorId } = require('../helpers/db-validators');

const { validarJWT, validarCampos, tieneRole,  } = require('../middlewares');


const router = Router();


router.get('/', obtenerProductos);


router.get('/:id', [
    check('id', 'No es un id de mongo válido...').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
],obtenerProducto);


router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es in id válido').isMongoId(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    validarCampos,
] , crearProducto);


router.put('/:id',[
    validarJWT,
    //check('categoria', 'No es in id válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], actualizarProducto);



router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un id de mongo válido...').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], eliminarProducto);



module.exports = router;