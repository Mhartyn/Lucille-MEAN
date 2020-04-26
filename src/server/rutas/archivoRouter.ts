import { Router } from 'express';
import { verificaToken } from '../middelware/autenticacion';
import ArchivoController from '../controller/archivoController';

const archivoRouter = Router();

archivoRouter.put('/sube/:tipo/:id', verificaToken, ArchivoController.Sube);
archivoRouter.get('/descarga/:tipo/:img', ArchivoController.Descarga);

export default archivoRouter;
