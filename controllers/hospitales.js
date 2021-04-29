const { response } = require('express');
const Hospital = require('../models/hospital');

 const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find()
                                .populate('usuario','nombre');

    res.json({
        ok: true,
        hospitales
    });

}

const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital( {
        usuario: uid,
        ...req.body
    });
    
    try{
        //Guardar hospital
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
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


const actualizarHospital = async(req, res = response) => {

    
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
            msg: 'hospital'
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

const borrarHospital = async(req, res = response) => {

    res.json({

        ok: true,
        msg: 'borrar'
    })
}


module.exports = {

    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital

}