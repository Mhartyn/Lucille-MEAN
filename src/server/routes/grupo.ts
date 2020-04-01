import {Router, Request, Response} from 'express';
import { verificaToken } from '../middelware/autenticacion';
import Grupo from '../models/grupo';

const grupoController = Router();

//listar grupos
grupoController.get('/maestros/grupos/:nombre', [ verificaToken ], (req: Request, res: Response) => {
    let nombre = req.params.nombre;
    let regEx = new RegExp(nombre, 'i');

    let {pagina, tamanio} = req.query;
    
    pagina = Number(pagina);
    tamanio = Number(tamanio);

    let desde = pagina === 1 ? 0 : (pagina - 1) * tamanio;
    
    let criterio = {
        nombre: regEx,
        activo: true
    }

    Grupo.find(criterio)
        .skip(desde)
        .limit(tamanio)        
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .exec((err, grupos) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    message: err,
                    resultados: []
                });
            }

            Grupo.countDocuments(criterio, (err, total) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        message: err,
                        resultados: []
                    });
                }
                res.json({
                    ok: true,
                    message: '',
                    resultados: { 
                        items: grupos,
                        pagina,
                        tamanioPagina: tamanio,
                        totalItems: total
                    }
                });

            });
            
        });    
});

//consultar grupos
grupoController.get('/maestros/grupo/:id', [ verificaToken ], (req: Request, res: Response) => {
    const id = req.params.id;

    Grupo.find({id})
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .exec((err, grupos) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                message: 'grupo',
                grupo: grupos[0]
            });
        });
});

//crear grupos
grupoController.post('/maestros/grupo', verificaToken, (req: Request, res: Response) => {
    let {nombre, descripcion} = req.body;

    let grupo = new Grupo({
        nombre: nombre,
        descripcion: descripcion,
        //usuario: req.usuario._id
    });

    grupo.save((err, db) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (db === null) {
            return res.status(400).json({
                ok: false,
                err: 'No se creo'
            });
        }

        res.json({
            ok: true,
            Item: db
        });
    });
});

//modifica grupo
grupoController.put('/maestros/grupo/:id', verificaToken, (req: Request, res: Response) => {
    let id = req.params.id;
    let {nombre, descripcion} = req.body;

   
    Grupo.findOneAndUpdate({_id: id}, {nombre, descripcion}, {
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
    }, (err, db) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err
            });
        }

        res.json({
            ok: true,
            message: '',
            item: db
        });
    })
});

//elimina un grupo
grupoController.delete('/maestros/grupo/:id', [verificaToken/* , verificaAdmin_Role */], (req: Request, res: Response) => {
    let id = req.params.id;
    
    Grupo.findOneAndUpdate({_id: id}, { activo: false }, {
        new: true,
        runValidators: true,
    }, (err, db) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            item: db
        });
    });
}); 

export default grupoController;