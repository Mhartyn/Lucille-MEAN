import { Request, Response } from 'express';
import { MaestroRepositorio } from '../repositorio/maestroRepositorio';
import { IMaestroModel } from '../modelo/interfaces/iMaestroModel';
import { IConsultaModel } from '../modelo/interfaces/iConsulta';

class MaestroController{
    static listar = async (req: Request, res: Response) => {
        let {nombre, tipo} = req.params;    
        let {pagina, tamanio, orden, direccion} = req.query;    
        
        let item = <IMaestroModel>{
            nombre: nombre,
            tipo: tipo,
            eliminado: false
        };

        let criterio = <IConsultaModel<IMaestroModel>>{
            item: item,
            orden: String(orden),
            direccion: Number(direccion),
            pagina: Number(pagina),
            tamanio: Number(tamanio),
        }
        
        let repo = new MaestroRepositorio();    
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
        const {id, tipo} = req.params;
    
        let usuario = res.locals.usuarioSesion.usuario;
    
        let item = <IMaestroModel>({
            _id: id,
            tipo: tipo,
            usuarioCreacion: usuario
        });

        let repo = new MaestroRepositorio();
        repo.obtener(item).then((maestro: IMaestroModel) => {
                res.json({
                    ok: true,
                    message: 'maestro',
                    maestro
                });
            }, (err: Error) => {
                if (err) {
                  res.json({
                      ok:false,
                      err
                  });
                }
              });
    }

    static crear = async (req: Request, res: Response) => {
        let {nombre, descripcion} = req.body;
        let tipo = req.params.tipo;
        let usuario = res.locals.usuarioSesion.usuario;
    
        let maestro = <IMaestroModel>({
            nombre: nombre,
            descripcion: descripcion,
            tipo: tipo,
            usuarioCreacion: usuario
        });
    
        let repo = new MaestroRepositorio();
    
        repo.crear(<IMaestroModel>maestro).then((respuesta: any) => {    
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
        let {tipo, id} = req.params;
        let {nombre, descripcion} = req.body;
        
        let usuario = res.locals.usuarioSesion.usuario;

        let repo = new MaestroRepositorio();
        repo.modificar(<IMaestroModel>{
            _id: id,
            nombre, 
            descripcion,
            tipo: tipo,
            usuarioModificacion: usuario
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
        let {tipo, id} = req.params;

        let usuario = res.locals.usuarioSesion.usuario;
        let item = <IMaestroModel>{
            _id: id,
            tipo: tipo,
            eliminado: true,
            usuarioModificacion: usuario
        };

        let repo = new MaestroRepositorio();
        
        if (logico) {
            repo.eliminarLogico(item).then((respuesta: any) => {    
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

export default MaestroController;