import {Router, Request, Response} from 'express';
import { verificaToken } from '../middelware/autenticacion';
import { MaestroRepositorio } from '../repositorio/maestroRepositorio';
import { IMaestroModel } from '../modelo/interfaces/maestro';
import Maestro from '../modelo/maestroModelo';

const maestroRoute = Router();

//listar maestro, filtrado por nombre, el nombre es opcional, ordenado y paginado
maestroRoute.get('/maestro/:nombre?', [ verificaToken ], (req: Request, res: Response) => {
    let nombre = req.params.nombre;    
    let {pagina, tamanio, orden, direccion} = req.query;
    
    pagina = Number(pagina);
    tamanio = Number(tamanio);
    direccion = Number(direccion);

    let repo = new MaestroRepositorio();

    repo.consultar(nombre, orden, direccion, pagina, tamanio).then((respuesta: any) => {
        res.json({
            ok: true,
            message: '',
            respuesta
        });

    }, (err: Error) => {
        if (err) {
          console.log(err.message);
        }
      });

    });

//consultar por id maestro
maestroRoute.get('/maestro/:id', [ verificaToken ], (req: Request, res: Response) => {
    const id = req.params.id;

    let repo = new MaestroRepositorio();
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
maestroRoute.post('/maestro', verificaToken, (req: Request, res: Response) => {
    let {nombre, descripcion} = req.body;

    let maestro = new Maestro({
        nombre: nombre,
        descripcion: descripcion,
        //usuario: req.usuario._id
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
});

//modifica maestro
maestroRoute.put('/maestro/:id', verificaToken, (req: Request, res: Response) => {
    let id = req.params.id;
    let {nombre, descripcion} = req.body;

    let repo = new MaestroRepositorio();
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
maestroRoute.delete('/maestro/:id', [verificaToken/* , verificaAdmin_Role */], (req: Request, res: Response) => {
    let id = req.params.id;
    
    let repo = new MaestroRepositorio();
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

export default maestroRoute;