import Server from './server/server';
import mongoose from 'mongoose';
import { Inicial } from './server/config/inicial';

Inicial.init();

let port: number = <number>(process.env.PORT);
const server = Server.init(port);   

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
    }, (err)=> {
        if (err) {
            console.log(err);
        }

        console.log('BD conectada....');
    });

server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${port}`);    
});