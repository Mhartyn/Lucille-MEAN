import { Request, Response } from 'express';
import UsuarioRepositorio from '../repositorio/usuarioRepositorio';
import Respuesta from '../modelo/interfaces/genericos/iRespuesta';
import IUsuarioModel from '../modelo/interfaces/iUsuarioModel';
import utils from '../utlis';
import path from 'path';
import fs from 'fs';

class ArchivoController{
    public static Sube = async (req: Request, res: Response) => {
        try {
            let { tipo, id } = req.params;

            let {files} = req;
            
            if (!files) {
                return res.status(503).json(new Respuesta('Error al subir archivo files', {}));
            }

            //validar tipo
            let tiposValidos = ['producto', 'usuario'];
            if (tiposValidos.indexOf(tipo) < 0) {
                return res.status(503).json(new Respuesta(`Los tipos permitidos son ${tiposValidos.join(',')}, el archivo tiene tipo ${tipo}`, {}));
            }

            let archivo: any = files.archivo;            
            let nombreArchivo = archivo.name.split('.');            
            let extension = nombreArchivo[nombreArchivo.length - 1];                    

            //extensiones permitidas
            let extensionesPermitidad = ['PNG', 'JPG', 'GIF', 'JPEG'];
                
            if (extensionesPermitidad.indexOf(extension.toUpperCase()) < 0) {
                return res.status(503).json(new Respuesta(`las extensiones permitidas son ${extensionesPermitidad.join(',')}, el archivo tiene extension ${extension}`, {}));
            }
            
            let nombreGenerado = `${id}-${new Date().getMilliseconds()}.${extension}`;
            
            utils.creaDirectorio(tipo);
            let pathImg = path.resolve(__dirname, `../../${process.env.FILE_UPLOAD}/${tipo}/${nombreGenerado}`);
            archivo.mv(pathImg, (err: any) => {
            if (err) return res.status(503).json(new Respuesta(`Error al mover archivo mv`, err));            

                switch (tipo) {
                    case 'usuario':
                        ArchivoController.imagenUsuario(id, res, nombreGenerado, tipo);
                        break;
                    case 'producto':
                        //imagenProducto(id, res, nombreGenerado, tipo);
                        break;
                    default:
                        return res.status(503).json(new Respuesta(`Tipo de archivo incorrecto`, err));
                }
            });
        } catch (err) {
            return res.status(503).json(new Respuesta('Error al subir archivo catch', err));
        }
    }        

    private static imagenUsuario = async (id: string, res: Response, nombreArchivo: string, tipo: string ) => {
        try {
            let repo = new UsuarioRepositorio();

            let respuesta: any = await repo.obtener(id);

            if (!respuesta) {
                utils.borrarAcrhivo(nombreArchivo, tipo);
                return res.status(503).json(new Respuesta('usuario no existe', {}));                
            }

            let usuario = respuesta.item;            
            utils.borrarAcrhivo(usuario.img, tipo)
    
            usuario.img = nombreArchivo;

            usuario = await repo.modificar(usuario);
            res.json(new Respuesta('', usuario, res));            

        } catch (error) {
            utils.borrarAcrhivo(nombreArchivo, tipo);
            return res.status(503).json(new Respuesta('Error al modificar usuario', error));
        }
    };

    public static Descarga = async (req: Request, res: Response) => {
        let { tipo, img } = req.params;        
    
        let pathNoImage = path.resolve(__dirname, `../../${process.env.IMG_DEFECTO}`);
        let pathImg = path.resolve(__dirname, `../../${process.env.FILE_UPLOAD}/${tipo}/${img}`);
        let pathResp = '';
        
        if (fs.existsSync(pathImg)) {
            pathResp = pathImg;
        } else {
            pathResp = pathNoImage;
        }
    
        res.sendFile(pathResp);
    }
}

export default ArchivoController;