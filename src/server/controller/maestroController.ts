import { Request, Response } from 'express';
import MaestroRepositorio from '../repositorio/maestroRepositorio';
import IMaestroModel from '../modelo/interfaces/iMaestroModel';
import ConsultaModel from '../modelo/interfaces/genericos/iConsulta';
import Respuesta from '../modelo/interfaces/genericos/iRespuesta';

class MaestroController{
    static listar = async (req: Request, res: Response) => {
        let {nombre, tipo} = req.params;    
        let {pagina, tamanio, orden, direccion} = req.query;    
        
        let item = <IMaestroModel>{
            nombre: nombre,
            tipo: tipo,
            eliminado: false
        };

        let criterio = new ConsultaModel<IMaestroModel>(item, Number(pagina),orden,Number(direccion),Number(tamanio));
        let repo = new MaestroRepositorio();
        
        repo.consultar(criterio).then((respuesta: any) => {
            res.json(new Respuesta('', respuesta, res));
        }, (err: Error) => {
            res.json(new Respuesta('Error al listar', err));
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
        repo.obtener(item).then((respuesta: IMaestroModel) => {
            res.json(new Respuesta('', respuesta, res));
            }, (err: Error) => {
                res.json(new Respuesta('Error al consultar', err));
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
            res.json(new Respuesta('', respuesta, res));
        }, (err: Error) => {
            res.json(new Respuesta('Error al crear', err));
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
            res.json(new Respuesta('', respuesta, res));
        }, (err: Error) => {
            res.json(new Respuesta('Error al modificar', err));
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
                res.json(new Respuesta('', respuesta, res));
            }, (err: Error) => {
                res.json(new Respuesta('Error al eliminar', err));
            });
        }
        else{
            repo.eliminar(id).then((respuesta: any) => {    
                res.json(new Respuesta('', {respuesta: 'Eliminado correctamente.'}, res));
            }, (err: Error) => {
                res.json(new Respuesta('Error al eliminar', err));
            });
        }
    }
}

export default MaestroController;