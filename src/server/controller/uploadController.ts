import Respuesta from '../modelo/interfaces/genericos/iRespuesta';
import { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import UsuarioRepositorio from '../repositorio/usuarioRepositorio';
import fs from 'fs';
import path from 'path';
import utils from '../utlis';
import IUsuarioModel from '../modelo/interfaces/iUsuarioModel';

class UploadController{
    public static SubirArchivos = async (req: Request, res: Response) => {
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
                
            if (extensionesPermitidad.indexOf(extension) < 0) {
                return res.status(503).json(new Respuesta(`las extensiones permitidas son ${extensionesPermitidad.join(',')}, el archivo tiene extension ${extension}`, {}));
            }
            
            let nombreGenerado = `${id}-${new Date().getMilliseconds()}.${extension}`;
            
            let pathImg = path.resolve(__dirname, `../../public/uploads/${tipo}s/${nombreGenerado}`);
            archivo.mv(pathImg, (err: any) => {
            if (err) return res.status(503).json(new Respuesta(`Error al mover archivo mv`, err));            

                switch (tipo) {
                    case 'usuario':
                        UploadController.imagenUsuario(id, res, nombreGenerado, tipo);
                        break;
                    case 'producto':
                        //imagenProducto(id, res, nombreGenerado, tipo);
                        break;
                    default:
                        return res.status(503).json(new Respuesta(`Tipo de archivo incorrecto`, err));
                    break;
                }


            });
        } catch (err) {
            return res.status(503).json(new Respuesta('Error al subir archivo catch', err));
        }
    }

    private static borrarAcrhivo = (nombreArchivo: string, tipo: string) => {
        let pathImg = path.resolve(__dirname, `../../public/uploads/${tipo}s/${nombreArchivo}`);
        //console.log(pathImg);
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }

    private static imagenUsuario = async (id: string, res: Response, nombreArchivo: string, tipo: string ) => {
        try {
            let repo = new UsuarioRepositorio();

            let respuesta: any = await repo.obtener(id);

            if (!respuesta) {
                UploadController.borrarAcrhivo(nombreArchivo, tipo);
                return res.status(503).json(new Respuesta('usuario no existe', {}));                
            }

            let usuario = respuesta.item;            
            UploadController.borrarAcrhivo(usuario.img, tipo)
    
            usuario.img = nombreArchivo;

            usuario = await repo.modificar(usuario);

            let token = utils.generaToken(<IUsuarioModel>usuario);

            res.json({
                ok: true,
                item :usuario,
                token
            });

        } catch (error) {
            UploadController.borrarAcrhivo(nombreArchivo, tipo);
            return res.status(503).json(new Respuesta('Error al modificar usuario', error));
        }
    };
}

export default UploadController;