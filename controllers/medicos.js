const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find({})
                                .populate('usuario','nombre')
                                .populate('hospital','nombre');

    res.json({
        ok: true,
        medicos
    });

}

const crearMedico = async(req, res = response) => {

    
    const uid = req.uid;

    console.log('uid',uid);

    const medico = new Medico( {
        usuario: uid,
        ...req.body
    });
    
    try{
        //Guardar medico
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
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


const actualizarMedico = async(req, res = response) => {

    
    try{

        /*const existe = await Usuario.findOne({email: email});

        if( existe ) {
            return res.status(400).json({
                ok: false,
                msg:'correo ya existe'
            })

        }
        */
        //const hospital;// = new Usuario( req.body );
  
        // Guardar usuario
        //await usuario.save();

  
        res.json({
            ok: true,
            msg: 'actualizar medico'
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

const borrarMedico = async(req, res = response) => {

    res.json({

        ok: true,
        msg: 'borrar medico'
    })
}


module.exports = {

    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico

}