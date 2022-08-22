const { response } = require("express");

const path = require("path")
const fs = require("fs")

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

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

    //Limpieza de imagenes

    if(modelo.img){
        //Borrar img del servidor
        const pathImage = path.join( __dirname, '../uploads', coleccion, modelo.img )
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage)
        }

    }

    const nombre = await subirArchivo( req.files, undefined, coleccion );
    modelo.img = nombre;
    await modelo.save();

    res.json(modelo);

}


const actualizarImagenCloudinary = async( req, res = response ) => {

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

    //Limpieza de imagenes
    if(modelo.img){
        //Borrar img del servidor
        const nombreArr     = modelo.img.split('/');
        const nombre        = nombreArr[ nombreArr.length - 1 ];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo);

}



const mostrarImagen = async( req, res = response ) => {

    const { id, coleccion } = req.params
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

    // imagenes
    if(modelo.img){
        //Borrar img del servidor
        const pathImage = path.join( __dirname, '../uploads', coleccion, modelo.img )
        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage)
        }
    }

    const pathImage = path.join( __dirname, '../assets/no-profile-icon.png' )
        res.sendFile(pathImage)

}



module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary,
}