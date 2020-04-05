import mongoose from 'mongoose';
import IBaseModel from './genericos/iBase';

export default interface IUsuarioModel extends IBaseModel, mongoose.Document {
  nombre: string;
  email: string;
  password: string;  
  rol: string;
  google: boolean;
}