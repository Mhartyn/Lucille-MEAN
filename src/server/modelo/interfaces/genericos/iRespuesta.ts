import { Response } from 'express';

interface IRespuesta{
    ok: boolean,
    message: string,
    respuesta: object,
    token: string,
}

export default class Respuesta implements IRespuesta{
    ok: boolean;
    message: string;
    respuesta: object;
    token: string;

    constructor(message: string, respuesta: object, res?: Response){
        this.ok = !message;
        this.message = message;
        this.respuesta = respuesta;
        let tmp = !res ? undefined : res.getHeader(process.env.TOKEN_REGRESO);
        this.token = !tmp ? '' : tmp.toString();
    }
}