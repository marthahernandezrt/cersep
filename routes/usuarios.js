
const { Router } = require('express');
const { check } = require('express-validator');
const { existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');


const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut );

router.post('/', [
    check('primerNombre', 'El primer nombre es obligatorio').not().isEmpty(),
    check('primerApellido', 'El primer apellido es obligatorio').not().isEmpty(),
    check('password', 'El password debe se ser más de 6 caracteres').isLength({min: 6}),
    check('email', 'El correo no es válido').isEmail(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('email').custom(existeEmail),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPost );

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;