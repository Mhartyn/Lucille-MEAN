import mongoose from 'mongoose';
import IBaseModel from './genericos/iBase';

export default interface IMaestroModel extends IBaseModel, mongoose.Document {
  nombre: string;
  descripcion: string; 
  tipo: string;  
}
