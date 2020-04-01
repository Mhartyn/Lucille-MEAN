import mongoose from 'mongoose';
import { IBaseModel } from './base';

export interface IMaestroModel extends IBaseModel, mongoose.Document {
  nombre: string;
  descripcion: string;  
}