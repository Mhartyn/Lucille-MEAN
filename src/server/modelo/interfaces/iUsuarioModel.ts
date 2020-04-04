import mongoose from 'mongoose';
import { IBaseModel } from './iBase';

export interface IUsuarioModel extends IBaseModel, mongoose.Document {
  nombre: string;
  email: string;
  password: string;  
  rol: string;
  google: boolean;
}