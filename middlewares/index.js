const validar_JWT   = require('../middlewares/validar-jwt');
const validaCampos  = require('../middlewares/validar-campos');

module.exports = {
    ...validar_JWT,
    ...validaCampos
}