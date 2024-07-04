const { Router } = require('express');
const { check } = require('express-validator');


/* const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos'); */

const { validarJWT, validarCampos } = require('../middlewares/index');


const { futbolistasGet, futbolistaById, futbolistaSave, futbolistaUpdate, futbolistaDelete } = require('../controllers/futbolista.controller');
const { existeFutbolistaById, existeUsuarioById } = require('../helpers/db-validators');
const { validarUsuarioFutbolista } = require('../middlewares/validar-usuario-futbolista');


const router = Router();


router.get('/', [
    validarJWT,
    validarCampos
], futbolistasGet );

router.get('/:id', [
    validarJWT,
    check('id').custom( existeFutbolistaById ),
    validarCampos
], futbolistaById );

router.post('/', [
    validarJWT,
    check('imagen', 'La URL de la imagen del futbolista es obligtaoria.').not().isEmpty(),
    check('nombre', 'El nombre del futbolista es obligtaorio.').not().isEmpty(),
    check('posicion', 'La posición del futbolista es obligtaoria.').not().isEmpty(),
    //check('usuario', 'El ID del usuario es obligatorio.').isMongoId(),
    check('usuario').custom( existeUsuarioById ),
    validarCampos
], futbolistaSave );


router.put('/:id', [
    validarJWT,
    check('id').custom( existeFutbolistaById ),
    check('imagen', 'La URL de la imagen del futbolista es obligtaoria.').not().isEmpty(),
    check('nombre', 'El nombre del futbolista es obligtaorio.').not().isEmpty(),
    check('posicion', 'La posición del futbolista es obligtaoria.').not().isEmpty(),
    validarUsuarioFutbolista,
    validarCampos
], futbolistaUpdate );


router.delete('/:id', [
    validarJWT,
    check('id').custom( existeFutbolistaById ),
    validarUsuarioFutbolista,
    validarCampos
], futbolistaDelete );



module.exports = router;