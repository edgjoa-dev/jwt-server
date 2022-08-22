const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const { Usuario, Producto } = require("../models");




const cargarArchivos = async( req, res = response ) => {

    try {
        // Obtener nombre del archivo
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }
}

const actualizarImagen = async( req, res = response ) => {

    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No se pudo actualizar la imagen del usuario ${id}`
                })
            }

            break;

            case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No se pudo actualizar la imagen del producto ${id}`
                })
            }

            break;

        default:

        return res.status(500).json({ msg: 'En espera de ser validado'});
    }

    const nombre = await subirArchivo( req.files, undefined, coleccion );
    modelo.img = nombre;
    await modelo.save();

    res.json(modelo);

}



module.exports = {
    cargarArchivos,
    actualizarImagen,
}