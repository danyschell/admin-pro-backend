/*
    Path: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/',
    [
        check('email','El email es requerido').isEmail(),
        check('password','El pass es requerido').notEmpty(),
        validarCampos
    ],
    login
)

router.post('/google',
    [
        check('token','El token de Google es requerido').notEmpty(),
        validarCampos
    ],
    googleSignIn
)


module.exports = router;
