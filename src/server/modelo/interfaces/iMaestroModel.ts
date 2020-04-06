import IBaseModel from './genericos/iBase';

export default interface IMaestroModel extends IBaseModel {
  nombre: string;
  descripcion: string; 
  tipo: string;  
}
