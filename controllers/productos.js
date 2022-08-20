const { response }  = require('express');
const { Producto } = require('../models');



const obtenerProductos = async( req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('producto', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.status(200).json({
        total,
        productos
    });

}


const obtenerProducto = async( req, res = response ) => {

    const { id } = req.params;

    const producto = await Producto.findById(id)
    .populate('usuario', 'nombre')
    .populate('producto', 'nombre');

    res.status(200).json({
        producto
    });

}



const crearProducto = async(req, res = response) => {

    const { estado, usuario, ...body } = req.body

    const productoDB = await Producto.findOne({ nombre });

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto: ${productoDB.nombre}, ya existe en DB`
        });
    }
    //generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    //crear producto
    const producto = new Producto(data);

    // Guardar en BD
    await producto.save();

    res.status(201).json({
        producto
    });
}



const actualizarProducto = async( req, res = response ) => {

    const { id } = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Categoria.findByIdAndUpdate(id, data, {new: true});

    res.status(201).json({
        producto
    });

}

const eliminarProducto = async ( req, res = response ) => {

    const { id } = req.params;
    const categoriaEliminada = await Categoria.findByIdAndUpdate( id, { estado: false }, {new: true} );

    res.status(200).json(categoriaEliminada);

}






module.exports = {
    obtenerProducto,
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
}