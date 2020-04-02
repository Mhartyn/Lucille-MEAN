import { IMaestroModel } from '../modelo/interfaces/maestro';
import { RepositoryBase } from './generico/base';
import MaestroSchema from '../modelo/maestroModelo';
import { utils } from '../utlis';

export class MaestroRepositorio extends RepositoryBase<IMaestroModel> {
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

    public consultar(nombre: string, sort: string, direccion: number, pagina: number, tamanio: number) : Promise<IMaestroModel> {
      let p = new Promise((resolve, reject) => {
        let regEx = new RegExp(nombre, 'i');
        
        let desde = pagina === 1 ? 0 : (pagina - 1) * tamanio;    
        let criterio = { nombre : regEx };
        this.find(criterio)
            .sort([[sort, direccion]]).skip(desde).limit(tamanio) //orden y paginacion
            .exec((err: Error, res: any) => {
          if (err) {
            reject(err);
          }
          else {
            this.count(criterio, (err: Error, total: number)=>{
              if (err) {
                reject(err);
              }
              else {
                if (res.length) {
                  resolve({
                    items: res,
                    pagina,
                    tamanioPagina: tamanio,
                    totalItems: total,
                    totalPaginas: utils.numeroPaginas(total, tamanio)
                  });
                }
                else {
                  resolve(null);
                }
              }
            });

          }
        });
      });
      
      return <Promise<IMaestroModel>>p;
    }

    public obtener(id: string) : Promise<IMaestroModel> {
      let p = new Promise((resolve, reject) => {
        
        this.findById(id, (err: Error, res: IMaestroModel) => {
          if (err) {
            reject(err);
          }
          else {
                if (res) {
                  resolve({
                    items: res,
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