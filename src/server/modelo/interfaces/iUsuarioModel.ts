import IBaseModel from './genericos/iBase';

export default interface IUsuarioModel extends IBaseModel {
  nombre: string;
  email: string;
  password: string;  
  rol: string;
  img: string;
  google: boolean;
}