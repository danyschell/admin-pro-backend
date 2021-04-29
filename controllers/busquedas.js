const { response } = require('express');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

 const getTodo = async(req, res = response) => {

    const buscar = req.params.buscar;
    const regex = new RegExp( buscar, 'i');

   /* const usuarios = await Usuario.find({ nombre: regex });
    const hospitales = await Hospital.find({ nombre: regex });
    const medicos = await Medico.find({ nombre: regex });*/
    

    const [ usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
    ])

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    });

}



const getDocumentosColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const buscar = req.params.buscar;
    const regex = new RegExp( buscar, 'i');
    let data = [];

    switch(tabla){
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });

        break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                .populate('usuario','nombre img');
            
        break;

        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                .populate('usuario','nombre')
                                .populate('hospital','nombre');

        break;
     
        default:
            return res.status(400).json({
                ok: false,
                msg:'la tabla debe ser usuarios/hospitales/medicos' 
            });
    }



    res.json({
        ok: true,
        resultados: data
    });

}


module.exports = {
    getTodo,
    getDocumentosColeccion
}
