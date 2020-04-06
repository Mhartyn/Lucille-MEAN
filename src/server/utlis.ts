import * as jwt from 'jsonwebtoken';
import IUsuarioModel from './modelo/interfaces/iUsuarioModel';


export default class utils{
    static numeroPaginas = (total: number, tamanio: number): number => {
        let nro = Math.round(total / tamanio);
        if (nro * tamanio < total) {
            nro += 1;
        }
        return nro;
    }

    static generaToken = (item: IUsuarioModel) : string => {
        let token = <string>jwt.sign({ usuario: item }, 
            process.env.SEED, {
            expiresIn: process.env.CADUCIDAD_TOKEN
        });

        return token;
    }
    
}