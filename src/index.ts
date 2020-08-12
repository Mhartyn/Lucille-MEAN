import Server from './server/server';
import mongoose from 'mongoose';
import Inicial from './server/config/inicial';

Inicial.init();

let port: number = <number>(process.env.PORT);
const server = Server.init(port);   

try {
    mongoose.connect(process.env.URLDB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            dbName: 'presupuesto'
            }).catch(error => console.log("Error al conectarse con la bd: " + error));
    
    console.log('BD conectada....');
} catch (error) {
    console.log(error);
}

server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${port}`);
    
    //console.log('************************************************');
    //console.log('*****************DETALLE************************');
    //console.log('************************************************');
    //console.log("NODE_ENV: " + process.env.NODE_ENV);
    //console.log("MONGO_URI: " + process.env.MONGO_URI);
    //console.log('************************************************');
    //console.log('*****************FIN DETALLE********************');
    //console.log('************************************************');
});

export default server.app;