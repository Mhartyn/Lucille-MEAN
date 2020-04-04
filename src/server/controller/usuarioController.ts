import { Request, Response } from 'express';
import { UsuarioRepositorio } from '../repositorio/usuarioRepositorio';
import { IUsuarioModel } from '../modelo/interfaces/iUsuarioModel';
import bcrypt from 'bcrypt'
import { IConsultaModel } from '../modelo/interfaces/iConsulta';

class UsuarioController{
    static listar = async (req: Request, res: Response) => {
        let nombre = req.params.nombre;    
        let {pagina, tamanio, orden, direccion} = req.query;    
        
        let item = <IUsuarioModel>{
            nombre: nombre,            
            eliminado: false
        };

        let criterio = <IConsultaModel<IUsuarioModel>>{
            item: item,
            orden: String(orden),
            direccion: Number(direccion),
            pagina: Number(pagina),
            tamanio: Number(tamanio),
        }
    
        let repo = new UsuarioRepositorio();
    
        let newToken = res.getHeader('token');
        
        repo.consultar(criterio).then((respuesta: any) => {
            res.json({
                ok: true,
                message: '',
                respuesta,
                token: newToken
            });
    
        }, (err: Error) => {
            if (err) {
              console.log(err.message);
            }
        });
    }

    static consultar = async (req: Request, res: Response) => {
        const id = req.params.id;
    
        let repo = new UsuarioRepositorio();
        repo.obtener(id).then((usuario: IUsuarioModel) => {
                res.json({
                    ok: true,
                    message: 'usuario',
                    usuario
                });
            }, (err: Error) => {
                if (err) {
                  console.log(err.message);
                }
              });
    }

    static crear = async (req: Request, res: Response) => {
        let {nombre, email, password, rol} = req.body;
    
        let usuario = <IUsuarioModel>({
            nombre: nombre,
            email: email,
            password: await bcrypt.hash(password, 256),
            rol: rol,
            google: false
            //usuario: req.usuario._id
        });
    
        let repo = new UsuarioRepositorio();
    
        repo.crear(<IUsuarioModel>usuario).then((respuesta: any) => {    
            res.json({
                ok: true,
                Item: respuesta
            });
        }, (err: Error) => {
            res.json({
                ok:false,
                message: err
            });
        });
    }

    static modificar = async (req: Request, res: Response) => {
        let id = req.params.id;
        let {nombre, email, password, rol} = req.body;
    
        let repo = new UsuarioRepositorio();
        repo.modificar(<IUsuarioModel>{
            _id: id,
            nombre: nombre,
            email: email,
            password: await bcrypt.hash(password, 256),
            rol: rol            
        }).then((respuesta: any) => {    
            res.json({
                ok: true,
                Item: respuesta
            });
        }, (err: Error) => {
            res.json({
                ok:false,
                message: err
            });
        });
    }

    static eliminar = async (req: Request, res: Response) => {
        let logico = req.params.logico;
        let id = req.params.id;
        
        let repo = new UsuarioRepositorio();
        
        if (logico) {
            repo.eliminarLogico(id).then((respuesta: any) => {    
                res.json({
                    ok: true,
                    message: 'Eliminado correctamente.',
                    respuesta
                });
            }, (err: Error) => {
                res.json({
                    ok:false,
                    message: err
                });
            });
        }
        else{
            repo.eliminar(id).then((respuesta: any) => {    
                res.json({
                    ok: true,
                    message: 'Eliminado correctamente.',
                    respuesta
                });
            }, (err: Error) => {
                res.json({
                    ok:false,
                    message: err
                });
            });
        }
    }
}

export default UsuarioController;