import mongoose from 'mongoose';
import { IBaseModel } from './iBase';

export interface IMaestroModel extends IBaseModel, mongoose.Document {
  nombre: string;
  descripcion: string; 
  tipo: string;  
}
