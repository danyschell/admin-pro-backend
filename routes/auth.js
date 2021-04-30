/*
    Path: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

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

router.get('/renew', 
    validarJWT,
    renewToken
)


module.exports = router;
