const fs = require('fs');

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch(tipo){
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`; 
            if(fs.existsSync(pathViejo)){
                fs.unlinkSync(pathViejo);
            }

            usuario.img = nombreArchivo;
            await usuario.save();
            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if(!hospital){
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`; 
            if(fs.existsSync(pathViejo)){
                fs.unlinkSync(pathViejo)
            }

            hospital.img = nombreArchivo;
            await hospital.save();
            break;
    
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico){
                return false;
            }
            
            pathViejo = `./uploads/medicos/${medico.img}`; 
            if(fs.existsSync(pathViejo)){
                fs.unlinkSync(pathViejo);
            }

            medico.img = nombreArchivo;
            await medico.save();
            break;   

    }
    
    console.log('actualizarImagen');

}

module.exports = {
    actualizarImagen
}