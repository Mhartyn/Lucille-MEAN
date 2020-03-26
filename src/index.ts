import Server from './server/server';
import mongoose from 'mongoose';

let port = <number>(process.env.PORT || 3000);
const server = Server.init(port);   

mongoose.connect('mongodb://localhost:27017/presupuesto', {
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