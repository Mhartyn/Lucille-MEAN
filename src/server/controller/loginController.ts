import { Request, Response } from 'express';
import utils from '../utlis';
import IUsuarioModel from '../modelo/interfaces/iUsuarioModel';
import UsuarioRepositorio from '../repositorio/usuarioRepositorio';
import Respuesta from '../modelo/interfaces/genericos/iRespuesta';
import bcrypt from 'bcrypt';
import {OAuth2Client, TokenPayload} from 'google-auth-library'


class LoginController{
    public static login = async (req: Request, res: Response)=>{
        let { email, password } = req.body;
    
        let repo = new UsuarioRepositorio();        
        repo.inicioSesion(email).then((respuesta: any) => {            
            
            if (!respuesta) {
                res.status(503).json(new Respuesta('(Usuario) o la contraseña incorrecta', {}));
                return;
            }

            if (!bcrypt.compareSync(password, respuesta.item.password)) {
                return res.status(503).json(new Respuesta('Usuario o la (contraseña) incorrecta', {}));
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

    /* =============================================================
    ============================GOOGLE===========================
    ============================================================= */
    private static verificaTokenGoogle = async(token: string) => {
        const cliente_Id= process.env.CLIENT_ID;
        const client = new OAuth2Client(cliente_Id);
        
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: cliente_Id
        });
        
        let payload: TokenPayload = <TokenPayload>ticket.getPayload();

        return{
            nombre: <string>payload.name,
            email: <string>payload.email,
            img: <string>payload.picture            
        };
    } 

    public static googleLogin = async (req: Request, res: Response)=>{
        let { token } = req.body;

        let googleUser = await LoginController.verificaTokenGoogle(token).catch(e=>{
            return res.status(503).json({
                ok: false,    
                mensaje: 'token invalido',
                e
            });
        });

        return res.json({
            ok: true,
            googleUser
        });
    }

    /* =============================================================
    ============================FIN GOOGLE===========================
    ============================================================= */
}

export default LoginController;