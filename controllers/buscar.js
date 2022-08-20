const { response } = require("express");




const buscar = ( req, res = response ) => {

    res.json({
        msg: 'buscando...'
    })

}


module.exports = {
    buscar,
}