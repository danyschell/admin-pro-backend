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

    const uid = req.uid;
    const id = req.params.id;

    try {

        const hospital = await Hospital.findById( id );

        if( !hospital ) {
            return res.status(404).json({
                ok: false,
                msg:'hospital no existe'
            })

        }
        
        //hospital.nombre = req.body.nombre;
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        // Guardar hospital
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true});

        res.json({
            ok: true,
            hospital: hospitalActualizado
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

    const id = req.params.id;

    try{

        //validaciones
        const hospital = await Hospital.findById(id);
        if(!hospital){
                return res.status(404).json({
                    ok: false,
                    msg: 'hospital no existe'
                });
        }

        await Hospital.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: 'Hospital eliminado'
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

    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital

}