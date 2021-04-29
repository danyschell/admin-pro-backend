/*
    Path: api/todo/:buscar
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');

const router = Router();

router.get( '/:buscar', validarJWT, getTodo);
router.get( '/coleccion/:tabla/:buscar', validarJWT, getDocumentosColeccion);


module.exports = router;