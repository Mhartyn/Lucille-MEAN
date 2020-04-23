import IMaestroModel  from '../modelo/interfaces/iMaestroModel';
import RepositoryBase from './generico/base';
import MaestroSchema from '../modelo/maestroModelo';
import IConsultaModel from '../modelo/interfaces/genericos/iConsulta';
import RespuestaPaginada from '../modelo/interfaces/genericos/iRespuestaPaginada';

export default class MaestroRepositorio extends RepositoryBase<IMaestroModel> {
    constructor() {
      super(MaestroSchema);
    }

    public crear(item: IMaestroModel) : Promise<IMaestroModel> {
      let p = new Promise((resolve, reject) => {        
  
        this.create(item, (err: Error, res: any) => {
          if (err) {
            reject(err);
          }
          else {
            resolve(res);
          }
        });            
      });      
      return <Promise<IMaestroModel>>p;      
    }

    public modificar(item: IMaestroModel) : Promise<IMaestroModel> {
      let p = new Promise((resolve, reject) => {        
  
        this.update(item._id, item, (err: Error, res: any) => {
          if (err) {
            reject(err);
          }
          else {            
            if (res.ok) {
              this.findById(item._id, (err: Error, db: IMaestroModel)=>{
                resolve(db);
              });              
            }
          }
        });            
      });      
      return <Promise<IMaestroModel>>p;      
    }

    public eliminar(id: string) : Promise<IMaestroModel> {
      let p = new Promise((resolve, reject) => {        
  
        this.delete(id, (err: Error, res: any) => {
          if (err) {
            reject(err);
          }
          else {            
            resolve(res);
          }
        });            
      });      
      return <Promise<IMaestroModel>>p;      
    }

    public eliminarLogico(item: IMaestroModel) : Promise<IMaestroModel> {
      let p = new Promise((resolve, reject) => {        
                
        this.update(item._id, item, (err: Error, res: any) => {
          if (err) {
            reject(err);
          }
          else {            
            resolve(res);
          }
        });            
      });      
      return <Promise<IMaestroModel>>p;      
    }

    public consultar(criterio: IConsultaModel<IMaestroModel>) : Promise<IMaestroModel> {
      let p = new Promise((resolve, reject) => {
        let regEx = new RegExp(criterio.item.nombre, 'i');
        
        let desde = criterio.desde();    
        let _criterio = { nombre: regEx, tipo: criterio.item.tipo, eliminado: criterio.item.eliminado };
        this.find(_criterio)
            .sort([[criterio.orden, criterio.direccion]]) // orden y direccion
            .skip(desde) //paginacion, desde donde
            .limit(criterio.tamanio) // paginacion, hasta donde
            .exec((err: Error, res: any) => {
          if (err) {
            reject(err);
          }
          else {
            this.count(_criterio, (err: Error, total: number)=>{
              if (err) {
                reject(err);
              }
              else {
                if (res.length) {                  
                  resolve(new RespuestaPaginada(criterio, res, total));
                }
                else {
                  resolve(new RespuestaPaginada(criterio, null, 0));
                }
              }
            });
          }
        });
      });
      
      return <Promise<IMaestroModel>>p;
    }

    public obtener(item: IMaestroModel) : Promise<IMaestroModel> {
      let p = new Promise((resolve, reject) => {
        
        this.findOne(item, (err: Error, res: IMaestroModel) => {
          if (err) {
            reject(err);
          }
          else {
                if (res) {
                  resolve({
                    item: res,
                  });
                }
                else {
                  resolve(null);
                }
              }                 
        });
      });
      
      return <Promise<IMaestroModel>>p;
    }
  }