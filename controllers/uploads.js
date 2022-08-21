const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");


const cargarArchivos = async( req, res = response ) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).send({
        msg: 'No se ha seleccionado ningún archivo'
    });
        return;
    }

    // Obtener nombre del archivo
    const nombre = await subirArchivo( req.files )

    res.json({
        nombre
    });

}


module.exports = {
    cargarArchivos
}