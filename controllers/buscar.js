const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Producto, Categoria } = require('../models');


const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]




const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid(termino);

    if( esMongoID ){
        const usuario = await Usuario.findById( termino );
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp( termino, 'i');

    const usuarios = await Usuario.find({
        $or: [ {nombre: regex},{ correo: regex } ],
        $and: [{ estado: true }]
    })

    res.json({
        results: usuarios
    })

}



const buscar = ( req, res = response ) => {

    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes( coleccion )){
        return res.status(400).json({
            msg: `La colección no existe, las permitidas son: ${ coleccionesPermitidas }`
        })
    }


    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
        break;

        case 'categorias':

        break;

        case 'productos':

        break;

        default:
            res.status(500).json({
                msg: 'Se le olvido realizar está búsqueda'
            })
    }

}


module.exports = {
    buscar,
}