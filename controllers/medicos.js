const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find({})
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img');

    res.json({
        ok: true,
        medicos
    });

}

const getMedicoById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById(id)     
        .populate('usuario','nombre img')
        .populate('hospital','nombre img');

        res.json({
            ok: true,
            medico
        });

    } catch (error){
            res.json({
                ok: false,
                msg: 'medico no encontrado'
            });   
    }

}


const crearMedico = async(req, res = response) => {

    
    const uid = req.uid;
    const medico = new Medico({
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

    const uid = req.uid;
    const id = req.params.id;

    try {

        const medico = await Medico.findById( id );

        if( !medico ) {
            return res.status(404).json({
                ok: false,
                msg:'Medico no existe'
            })

        }
        
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        // Guardar medico
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true})
                                                                .populate('usuario','nombre')
                                                                .populate('hospital','nombre');

        res.json({
            ok: true,
            medico: medicoActualizado
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

    const id = req.params.id;

    try{

        //validaciones
        const medico = await Medico.findById(id);
        if(!medico){
                return res.status(404).json({
                    ok: false,
                    msg: 'Medico no existe'
                });
        }

        await Medico.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: 'Medico eliminado'
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

    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById

}