import {Router} from 'express';
import { verificaToken, verificaRol } from '../middelware/autenticacion';
import MaestroController from '../controller/maestroController';

const maestroRouter = Router();

//listar maestro, filtrado por nombre, el nombre es opcional, ordenado y paginado
maestroRouter.get('/maestros/:tipo/:nombre?', verificaToken, MaestroController.listar);

//consultar por id maestro
maestroRouter.get('/maestro/:tipo/:id', verificaToken, MaestroController.consultar);

//crear maestro
maestroRouter.post('/maestro/:tipo', verificaToken, MaestroController.crear);

//modifica maestro
maestroRouter.put('/maestro/:tipo/:id', verificaToken, MaestroController.modificar);

//elimina un maestro
maestroRouter.delete('/maestro/:tipo/:logico?/:id', [verificaToken, verificaRol(['ADMIN'])], MaestroController.eliminar); 

export default maestroRouter;