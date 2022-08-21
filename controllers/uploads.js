const path = require('path');

const { response } = require("express");


const cargarArchivos = ( req, res = response ) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).send({
        msg: 'No se ha seleccionado ningún archivo'
    });
    return;
    }

    const { archivo } = req.files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    const extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    if(!extensionesValidas.includes(extension)){
        res.status(400).json({
            msg: `Extensión: ${extension} no es válida, debe ser: ${ extensionesValidas}.`
        });
        return;
    }



//     const uploadPath = path.join (__dirname, '../uploads/', archivo.name);

//     archivo.mv(uploadPath, function(err) {
//     if (err) {
//         return res.status(500).json({err});
//     }

//     res.send('File uploaded to ' + uploadPath);
// });

}


module.exports = {
    cargarArchivos
}