const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = async(req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;
    
    // validar Tipo
    const tiposValidos = ['usuarios','hospitales','medicos'];
    if(!tiposValidos.includes(tipo)){

        return res.status(400).json({
            ok: false,
            msg: ' el tipo debe ser usuarios/hospitales/medicos'
        })
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no se subio ningun archivo'
        });
    }

    // Procesar la imagen
    const file = req.files.imagen;
    // extension
    const nombreCortado = file.name.split('.');// wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length-1];
    //valido extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if(!extensionesValidas.includes(extensionArchivo)) {

        return res.status(400).json({
            ok: false,
            msg: ' la extension debe ser ', extensionesValidas
        })
    }
    // generar nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // crear path para guardar
    const uploadPath = `./uploads/${tipo}/${nombreArchivo}`;

    // mover imagen    
    file.mv(uploadPath, (err) => {
        if (err){
          return res.status(500).json({
              ok: false,
              msg: 'hubo un error moviendo el archivo'
          });
        }

        // actualizar DB
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });
}


const retornaImagen = (req, res = response) => {
    
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //imagen por defecto

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);

    }else{
        const pathImg = path.join( __dirname , `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }

}

module.exports = {
    fileUpload,
    retornaImagen
}
