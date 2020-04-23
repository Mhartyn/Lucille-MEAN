import { Request, Response } from 'express';
import UsuarioRepositorio from '../repositorio/usuarioRepositorio';
import IUsuarioModel from '../modelo/interfaces/iUsuarioModel';
import ConsultaModel from '../modelo/interfaces/genericos/iConsulta';
import Respuesta from '../modelo/interfaces/genericos/iRespuesta';
import bcrypt from 'bcrypt';

class UsuarioController{
    static listar = async (req: Request, res: Response) => {
        try {
            let nombre = req.params.nombre;
            let {pagina, tamanio, orden, direccion} = req.query;    
            
            let item = <IUsuarioModel>{
                nombre: nombre,            
                eliminado: false
            };
    
            let criterio = new ConsultaModel<IUsuarioModel>(item, Number(pagina),orden,Number(direccion),Number(tamanio));    
            let repo = new UsuarioRepositorio();
            
            let respuesta = await repo.consultar(criterio);    
            res.json(new Respuesta('', respuesta, res));            
        } catch (err) {
            res.status(503).json(new Respuesta('Error al listar', err));            
        }
    }

    static consultar = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
    
            let repo = new UsuarioRepositorio();
            let respuesta = await repo.obtener(id);
            
            res.json(new Respuesta('', respuesta, res));
        } catch (err) {
            res.status(503).json(new Respuesta('Error al consultar', err));
            
        }
    }

    static crear = async (req: Request, res: Response) => {        
        try {
            let {nombre, email, password, rol} = req.body;
            
            //let usuarioSesion = <IUsuarioModel>res.locals.usuarioSesion;
            
            let usuario = <IUsuarioModel>{
                nombre, 
                email, 
                password: await bcrypt.hash(password, Number(process.env.VUELTAS_CLAVE)), 
                rol,
                //usuarioCreacion: usuarioSesion._id
            };
        
            let repo = new UsuarioRepositorio();
        
            let respuesta = await repo.crear(usuario);
            res.json(new Respuesta('', respuesta, res));
            
        } catch (err) {
            res.status(503).json(new Respuesta('Error al crear', err));            
        }
    }

    static modificar = async (req: Request, res: Response) => {        
        try {
            let id = req.params.id;
            let {nombre, email, password, rol, eliminado} = req.body;
    
            let usuarioSesion = <IUsuarioModel>res.locals.usuarioSesion;
            let repo = new UsuarioRepositorio();
            let usuario = <IUsuarioModel>{
                _id: id,
                nombre, 
                email, 
                password: await bcrypt.hash(password, Number(process.env.VUELTAS_CLAVE)),
                rol,
                eliminado,
                usuarioModificacion: usuarioSesion._id,
                fechaModificacion: new Date()
            };
            let respuesta = await repo.modificar(usuario);
            
            res.json(new Respuesta('', respuesta, res));
        } catch (err) {
            res.status(503).json(new Respuesta('Error al modificar', err));            
        }
    }

    static eliminar = async (req: Request, res: Response) => {        
        try {
            let logico = req.params.logico;
            let id = req.params.id;
            
            let usuarioSesion = <IUsuarioModel>res.locals.usuarioSesion;
            let repo = new UsuarioRepositorio();
            
            let usuario= <IUsuarioModel>{
                _id: id,
                eliminado: true,
                usuarioModificacion: usuarioSesion._id,
                fechaModificacion: new Date()
            }
    
            if (logico) {
                await repo.eliminarLogico(usuario);
            }
            else{
                await repo.eliminar(id);
            }            
            res.json(new Respuesta('', {respuesta: 'Se elimino correctamente.'}, res));
        } catch (err) {
            res.status(503).json(new Respuesta('Error al eliminar', err));            
        }
    }
}

export default UsuarioController;