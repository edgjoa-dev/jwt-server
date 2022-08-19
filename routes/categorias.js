const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria } = require('../controllers/categorias');

const { validarJWT, validarCampos,  } = require('../middlewares');


const router = Router();

router.get('/', (req, res) => {
    res.json({
        msg: 'categorias'
    })
})


router.get('/:id', (req, res) => {
    res.json({
        msg: 'categoria en especefico'
    })
})


router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
] , crearCategoria);



router.put('/:id', (req, res) => {
    res.json({
        msg: 'categoria actualizada'
    })
})



router.delete('/:id', ( req, res ) => {
    res.json({
        msg: 'categoria eliminada'
    })
})



module.exports = router;