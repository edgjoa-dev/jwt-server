const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const { Usuario, Producto } = require("../models");

const cargarArchivos = async( req, res = response ) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).send({
        msg: 'No se ha seleccionado ningún archivo'
    });
        return;
    }

    try {
        // Obtener nombre del archivo
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (error) {
        res.status().json({ msg });
    }
}

const actualizarImagen = async( req, res = response ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo: await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No se pudo actualizar la imagen del usuario ${id}`
                })
            }

            break;

        case 'productos':
            if(!modelo){
                return res.status(500).json({
                    msg: `No se pudo actualizar la imagen del usuario ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({ msg: 'En espera de ser validado'});
    }


    res.json({ id, coleccion });

}



module.exports = {
    cargarArchivos,
    actualizarImagen,
}