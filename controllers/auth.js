const { response } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async(req, res = response) => {

    const {email, password} = req.body;

    try{
        //verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'email no encontrado'
            });    
        }
        //verificar pass
        const validPassword = bcrypt.compareSync( password, usuarioDB.password);

        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'password invalido'
            });    
        }

        // Generar token - JWT
        const token = await generarJWT(usuarioDB.id);

        res.status(200).json({
            ok: true,
            token
        })



    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en Login'
        })

    }    

}

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try{

        const { name, email, picture } = await googleVerify(googleToken);

        // verifico si ya existe ese email en nuestra DB
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB){
            usuario = new Usuario({
                nombre: name,
                email, 
                password: '@@@',
                img: picture,
                google: true
            })

        }else {
            // ya existe porque se registró manualmente
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = '@@@';

        }

        // Guardar en DB
        await usuario.save();

        // Generar token - JWT
        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok: true,
            token
        });

    }
    catch(error){

        res.status(401).json({
            ok: false,
            msg: 'Error validando GoogleToken'
        });

    }


}

module.exports = {
    login,
    googleSignIn
}