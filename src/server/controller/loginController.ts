import { Request, Response } from 'express';
import utils from '../utlis';
import IUsuarioModel from '../modelo/interfaces/iUsuarioModel';
import UsuarioRepositorio from '../repositorio/usuarioRepositorio';
import Respuesta from '../modelo/interfaces/genericos/iRespuesta';
import bcrypt from 'bcrypt';
import {OAuth2Client, TokenPayload} from 'google-auth-library'


class LoginController{
    public static login = async (req: Request, res: Response)=>{
        try {
            
            let { email, password } = req.body;
        
            let repo = new UsuarioRepositorio();
    
            let respuesta: any = await repo.inicioSesion(email);
            
            if (!respuesta) {
                return res.status(503).json(new Respuesta('(Usuario) o la contraseña incorrecta', {}));            
            }

            if (respuesta.google) {
                return res.status(504).json(new Respuesta('Use inicio sesion por Google', {}));            
            }

            if (respuesta.eliminado) {
                return res.status(503).json(new Respuesta('Usuario desactivado', {}));            
            }
    
            let usuario = respuesta
    
            if (!bcrypt.compareSync(password, usuario.password)) {
                return res.status(503).json(new Respuesta('Usuario o la (contraseña) incorrecta', {}));
            }
    
            let token = utils.generaToken(<IUsuarioModel>usuario);
            
            res.json({
                ok: true,
                respuesta: usuario,
                menu: LoginController.opcionesMenu(usuario.rol),
                token
            });
        } catch (err) {
            return res.status(503).json(new Respuesta('Error al iniciar sesion', err));
        }
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
        try {
            
            let { token } = req.body;
    
            let googleUser:any = await LoginController.verificaTokenGoogle(token).catch(e=> res.status(503).json(new Respuesta('Token de google invalido', {})));
    
            if (!googleUser.email) return;
    
            let repo = new UsuarioRepositorio();        
            let respuesta: any = await repo.inicioSesion(googleUser.email)
                                    .catch(e=> res.status(503).json(new Respuesta('Email ya esta registrado', e)));
    
            let usuario: IUsuarioModel;
    
            if (respuesta) {
                usuario = respuesta;
                if (!usuario.google) {
                    return res.status(503).json(new Respuesta('Email ya esta registrado', {}));                
                }
            }
            else{    
                let usuarioNew = <IUsuarioModel>{
                    nombre: googleUser.nombre, 
                    email: googleUser.email, 
                    password: process.env.CLAVE_USUARIO_GOOGLE, 
                    rol: process.env.ROL_DEFAULT,
                    google: true,
                    img: googleUser.img
                };
                
                respuesta = await repo.crear(usuarioNew)
                usuario = respuesta;
            }
    
            const tokenNew: string = utils.generaToken(<IUsuarioModel>usuario);
            
            res.json({
                ok: true,
                respuesta: usuario,
                menu: LoginController.opcionesMenu(usuario.rol),
                token: tokenNew
            });
        } catch (err) {
            res.status(503).json(new Respuesta('Error al crear', err));
        }
    }
    /* =============================================================
    ============================FIN GOOGLE===========================
    ============================================================= */

    public static opcionesMenu(rol: string): any{
        let menu: any = [
            {
              titulo: 'Principal',
              icono: 'mdi mdi-gauge',
              submenu: [
                {titulo: 'Dashboard', url: '/dashboard'},
                {titulo: 'ProgressBar', url: '/progress'},
                {titulo: 'Grafica', url: '/grafica1'},
                {titulo: 'Promesas', url: '/promesas'},
                {titulo: 'RXJS', url: '/rxjs'}
              ]
            },
            {
              titulo: 'Mantenimientos',
              icono: 'mdi mdi-folder-lock-open',
              submenu: [
                  {titulo: 'Maestros', url: '/maestros'}
                ]
            }
        ];
        
        if (rol === 'ADMIN') {            
            menu[1].submenu.unshift({titulo: 'Usuarios', url: '/usuarios'});
        }
        return menu;
    }
}

export default LoginController;