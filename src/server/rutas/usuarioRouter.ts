import {Router} from 'express';
import { verificaToken, verificaRol } from '../middelware/autenticacion';
import UsuarioController from '../controller/usuarioController';

const usuarioRouter = Router();

//listar usuario, filtrado por nombre, el nombre es opcional, ordenado y paginado
usuarioRouter.get('/usuarios/:nombre?', [verificaToken, verificaRol(['ADMIN'])], UsuarioController.listar);

//consultar por id usuario
usuarioRouter.get('/usuario/:id', [verificaToken, verificaRol(['ADMIN'])], UsuarioController.consultar);

//crear usuario
usuarioRouter.post('/usuario', [verificaToken, verificaRol(['ADMIN'])], UsuarioController.crear);

//modifica usuario
usuarioRouter.put('/usuario/:id', [verificaToken, verificaRol(['ADMIN'])], UsuarioController.modificar);

//elimina un usuario
usuarioRouter.delete('/usuario/:logico?/:id', [verificaToken, verificaRol(['ADMIN'])], UsuarioController.eliminar); 

export default usuarioRouter;