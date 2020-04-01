import {Router, Request, Response} from 'express';
import { verificaToken } from '../middelware/autenticacion';
import { MaestroRepository } from '../repositorio/maestro';
import { IMaestroModel } from '../models/interfaces/maestro';
import Maestro from '../repositorio/schema/Maestro';

const maestroController = Router();

//listar maestro, filtrado por nombre, el nombre es opcional, ordenado y paginado
maestroController.get('/maestro/:nombre?', [ verificaToken ], (req: Request, res: Response) => {
    let nombre = req.params.nombre;    
    let {pagina, tamanio, orden} = req.query;
    
    pagina = Number(pagina);
    tamanio = Number(tamanio);
    let repo = new MaestroRepository();

    repo.consultar(nombre, orden, pagina, tamanio).then((respuesta: any) => {
        res.json({
            ok: true,
            message: `nombre ${nombre}`,
            respuesta
        });

    }, (err: Error) => {
        if (err) {
          console.log(err.message);
        }
      });

    });

//consultar por id maestro
maestroController.get('/maestro/:id', [ verificaToken ], (req: Request, res: Response) => {
    const id = req.params.id;

    let repo = new MaestroRepository();
    repo.obtener(id).then((maestro: IMaestroModel) => {
            res.json({
                ok: true,
                message: 'maestro',
                maestro
            });
        }, (err: Error) => {
            if (err) {
              console.log(err.message);
            }
          });
});

//crear maestro
maestroController.post('/maestro', verificaToken, (req: Request, res: Response) => {
    let {nombre, descripcion} = req.body;

    let maestro = new Maestro({
        nombre: nombre,
        descripcion: descripcion,
        //usuario: req.usuario._id
    });

    let repo = new MaestroRepository();

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
});

//modifica maestro
maestroController.put('/maestro/:id', verificaToken, (req: Request, res: Response) => {
    let id = req.params.id;
    let {nombre, descripcion} = req.body;

    let repo = new MaestroRepository();
    repo.modificar(<IMaestroModel>{
        _id: id,
        nombre, 
        descripcion
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
});

//elimina un maestro
maestroController.delete('/maestro/:id', [verificaToken/* , verificaAdmin_Role */], (req: Request, res: Response) => {
    let id = req.params.id;
    
    let repo = new MaestroRepository();
    repo.eliminar(id).then((respuesta: any) => {    
        res.json({
            ok: true,
            message: 'Eliminado correctamente.'
        });
    }, (err: Error) => {
        res.json({
            ok:false,
            message: err
        });
    });
}); 

export default maestroController;