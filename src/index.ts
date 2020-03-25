import Server from './server/server';

let port = <number>(process.env.PORT || 3000);
const server = Server.init(port);

server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${port}`);    
});