import { Request, Response } from 'express';
import utils from '../utlis';
import IUsuarioModel from '../modelo/interfaces/iUsuarioModel';
import UsuarioRepositorio from '../repositorio/usuarioRepositorio';
import Respuesta from '../modelo/interfaces/genericos/iRespuesta';
import bcrypt from 'bcrypt';

class LoginController{
    static login = async (req: Request, res: Response)=>{
        let { email, password } = req.body;
    
        let repo = new UsuarioRepositorio();        
        repo.inicioSesion(email).then((respuesta: any) => {            
            
            if (!respuesta) {
                res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario o la contraseña incorrecta'
                    }
                });
                return;
            }

            if (!bcrypt.compareSync(password, respuesta.item.password)) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario o la contraseña incorrecta'
                    }
                });
            }

            let token = utils.generaToken(<IUsuarioModel>respuesta.item);
            
            res.json({
                ok: true,
                item :respuesta.item,
                token
            });
            
        }, (err: Error) => {
            res.status(503).json(new Respuesta('Error al iniciar sesion', err));
        });            
    }
}

export default LoginController;