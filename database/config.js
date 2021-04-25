const mongoose = require('mongoose');


const dbConnection = async() => {

//mongodb+srv://mean_user:tFvljtXiG9b4QnB2@cluster0.kceud.mongodb.net/hospitaldb
    
    try {                     
                              
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('BD Online');
    
    }catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD');

    }

}

module.exports = {
    dbConnection
}