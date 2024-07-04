const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userById, userPost, userUpdate, userDelete } = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailExiste, existeUsuarioById } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');
//const path = require('path')

const router = Router();

/* router.get('/', (req, res) =>{
    const parentDir = path.normalize(__dirname+"/..");
    res.sendFile(parentDir+'/public/index.html');
});
 */


router.get('/', userGet );

router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],userById );

router.post('/',[
    check('email', 'El email es obligatorio.').isEmail(),
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y debe de tener más de 5 caracteres.').isLength({ min: 5, max: 30 }),
    check('email').custom( emailExiste ),
    validarCampos
] ,userPost );

router.put('/:id', [
    check('id').custom( existeUsuarioById ),
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos
], userUpdate);

router.delete('/:id', [
    validarJWT,
    check('id').custom( existeUsuarioById ),
    validarCampos
], userDelete);

module.exports = router;
