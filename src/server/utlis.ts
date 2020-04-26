import * as jwt from 'jsonwebtoken';
import IUsuarioModel from './modelo/interfaces/iUsuarioModel';
import path from 'path';
import fs from 'fs';

export default class utils{
    public static numeroPaginas = (total: number, tamanio: number): number => {
        let nro = Math.round(total / tamanio);
        if (nro * tamanio < total) {
            nro += 1;
        }
        return nro;
    }

    public static generaToken = (item: IUsuarioModel) : string => {
        let token = <string>jwt.sign({ usuario: item }, 
            process.env.SEED, {
            expiresIn: process.env.CADUCIDAD_TOKEN
        });

        return token;
    }

    public static creaDirectorio = (carpeta: string) : void => {
        var directorio = path.resolve(__dirname, `../${process.env.FILE_UPLOAD}`);
        if (!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio);
        }

        var directorioCarpeta = path.resolve(__dirname, `../${process.env.FILE_UPLOAD}/${carpeta}`);
        if (!fs.existsSync(directorioCarpeta)) {
            fs.mkdirSync(directorioCarpeta);
        }
    }
    
    public static borrarAcrhivo = (nombreArchivo: string, tipo: string) => {
        let pathImg = path.resolve(__dirname, `../${process.env.FILE_UPLOAD}/${tipo}/${nombreArchivo}`);

        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }
}