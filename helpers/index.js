const dbValidators = require('./dbvalidators');
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArchivos = require('./subir-archivos');


module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivos
}