import { Request, Response } from 'express';
import MaestroRepositorio from '../repositorio/maestroRepositorio';
import IMaestroModel from '../modelo/interfaces/iMaestroModel';
import ConsultaModel from '../modelo/interfaces/genericos/iConsulta';
import Respuesta from '../modelo/interfaces/genericos/iRespuesta';
import IUsuarioModel from '../modelo/interfaces/iUsuarioModel';

class MaestroController{
    static listar = async (req: Request, res: Response) => {
        try {

            let {nombre, tipo} = req.params;    
            let {pagina, tamanio, orden, direccion} = req.query;    
            
            let item = <IMaestroModel>{
                nombre: nombre,
                tipo: tipo,
                eliminado: false
            };
    
            let criterio = new ConsultaModel<IMaestroModel>(item, Number(pagina), String(orden),Number(direccion),Number(tamanio));
            let repo = new MaestroRepositorio();
        
            let respuesta: any = await repo.consultar(criterio);
            if (respuesta) {
                res.json(new Respuesta('', respuesta, res));            
            }            
        } catch (error) {
            res.status(503).json(new Respuesta('Error al listar', error));
        }
    }

    static consultar = async (req: Request, res: Response) => {
        try {
            const {id, tipo} = req.params;
        
            let item = <IMaestroModel>({
                _id: id,
                tipo: tipo
            });
    
            let repo = new MaestroRepositorio();
            let respuesta: IMaestroModel = await repo.obtener(item);
            res.json(new Respuesta('', respuesta, res));
        } catch (error) {
            res.status(503).json(new Respuesta('Error al consultar', error));            
        }            
    }

    static crear = async (req: Request, res: Response) => {
        try {
            
            let {nombre, descripcion} = req.body;
            let tipo = req.params.tipo;
            let usuario = <IUsuarioModel>res.locals.usuarioSesion;
            
            let maestro = <IMaestroModel>({
                nombre: nombre,
                descripcion: descripcion,
                tipo: tipo,
                usuarioCreacion: usuario._id
            });
        
            let repo = new MaestroRepositorio();
        
            let respuesta = await repo.crear(<IMaestroModel>maestro);
            res.json(new Respuesta('', respuesta, res));
        } catch (error) {
            res.json(new Respuesta('Error al crear', error));            
        }
    }

    static modificar = async (req: Request, res: Response) => {
        try {
            let {eliminado, id} = req.params;
            let {nombre, descripcion} = req.body;
            
            let usuario = <IUsuarioModel>res.locals.usuarioSesion;
    
            let repo = new MaestroRepositorio();
            let respuesta = await repo.modificar(<IMaestroModel>{
                _id: id,
                nombre, 
                descripcion,            
                eliminado: Boolean(eliminado),
                usuarioModificacion: usuario._id,
                fechaModificacion: new Date()
            });
            res.json(new Respuesta('', respuesta, res));            
        } catch (err) {
            res.status(503).json(new Respuesta('Error al modificar', err));            
        }
    }

    static eliminar = async (req: Request, res: Response) => {        
        try {
            let logico = req.params.logico;        
            let {tipo, id} = req.params;
    
            let usuario = <IUsuarioModel>res.locals.usuarioSesion;
            let item = <IMaestroModel>{
                _id: id,
                tipo: tipo,
                eliminado: true,
                usuarioModificacion: usuario._id,
                fechaModificacion: new Date()
            };
    
            let repo = new MaestroRepositorio();
            
            if (logico) {
                await repo.eliminarLogico(item);
            }
            else{
                await repo.eliminar(id);
            }
            res.json(new Respuesta('', {respuesta: 'Eliminado correctamente.'}, res));
            
        } catch (err) {
            res.status(503).json(new Respuesta('Error al eliminar', err));            
        }
    }
}

export default MaestroController;