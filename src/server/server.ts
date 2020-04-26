import loginRouter from './rutas/loginRouter';
import maestroRouter from './rutas/maestroRouter';
import usuarioRouter from './rutas/usuarioRouter';
import uploadRouter from './rutas/uploadRouter';

import express = require('express');
import bodyParser = require('body-parser');
import fileUpload = require('express-fileupload');

import path = require('path');

export default class Server{
    public app: express.Application;
    public port: number;
    
    constructor(puerto: number){
        this.port = puerto;
        this.app = express();
        this.app.use((req, res, next)=>{
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
            next();
        });

        this.app.use(fileUpload({ useTempFiles: true }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());        
    }

    static init (puerto: number){
        return new Server(puerto);
    }

    private publicFolder(){
        const publicPath = path.resolve(__dirname, '../public');        
        this.app.use(express.static(publicPath));
    }

    start(callback: (...args: any[]) => void){
        this.app.listen(this.port, callback);
        this.app.use(loginRouter);
        //this.app.use(grupoController);
        this.app.use(maestroRouter);
        this.app.use(usuarioRouter);
        this.app.use(uploadRouter);
        this.publicFolder();
    }    
}