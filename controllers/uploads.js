const { response } = require("express");

const cargarArchivos = ( req, res = response ) => {
    res.json({
        msg: 'Cargando archivo...'
    })
}


module.exports = {
    cargarArchivos
}