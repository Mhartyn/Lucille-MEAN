import express = require('express');
import path = require('path');
import bodyParser = require('body-parser');

export default class Server{
    public app: express.Application;
    public port: number;

    constructor(puerto: number){
        this.port = puerto;
        this.app = express();
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
        this.publicFolder();
    }    
}