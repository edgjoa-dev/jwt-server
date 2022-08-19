const { Router } = require('express');

const { check } = require('express-validator');
const {

    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria

} = require('../controllers/categorias');


const { existeCategoriaPorId } = require('../helpers/db-validators');

const { validarJWT, validarCampos,  } = require('../middlewares');


const router = Router();


router.get('/', obtenerCategorias)


router.get('/:id', [
    check('id', 'No es un id de mongo válido...').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
],obtenerCategoria)


router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
] , crearCategoria);


router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de mongo válido...').isMongoId(),
    validarCampos,
],actualizarCategoria)



router.delete('/:id', ( req, res ) => {
    res.json({
        msg: 'categoria eliminada'
    })
})



module.exports = router;