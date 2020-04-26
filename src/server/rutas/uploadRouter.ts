import { Router } from 'express';
import { verificaToken } from '../middelware/autenticacion';
import UploadController from '../controller/uploadController';

const uploadRouter = Router();

uploadRouter.put('/upload/:tipo/:id', verificaToken, UploadController.SubirArchivos);

export default uploadRouter;
