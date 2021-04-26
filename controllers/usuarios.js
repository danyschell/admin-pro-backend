const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

 const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({},'nombre email password google');

    res.json({
        ok: true,
        usuarios
    });

}

const crearUsuario = async(req, res = response) => {

    const {email, password } = req.body;

    try{

        const existe = await Usuario.findOne({email: email});

        if( existe ) {
            return res.status(400).json({
                ok: false,
                msg:'correo ya existe'
            })

        }

        const usuario = new Usuario( req.body );

        // Encriptar pass
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar usuario
        await usuario.save();

        // Generar token - JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        });
    }


}

const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try{

        //validaciones
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
               return res.status(404).json({
                   ok: false,
                   msg: 'usuario no existe'
               }) 
        }

        //TODO Validar token y verificar usuario

        // actualizar usuario - inicializar variables del req.body
        const {password, google, email, ...campos} = req.body;

        if(usuarioDB.email !== email){

            // verifico que el correo no esté ya en uso
            const existe = await Usuario.findOne({email});
            if(existe){
                return res.status(400).json({
                    ok: false,
                    msg: 'ya existe un usuario con ese email'
                });
            }
        }
        //volvemos a agregar el email del req.body, ya verificado
        campos.email = email;    
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en PUT'
        })
    }

}

const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try{

        //validaciones
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
                return res.status(404).json({
                    ok: false,
                    msg: 'usuario no existe'
                });
        }

        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        });


    }catch(error){
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error en Delete'           
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
} 