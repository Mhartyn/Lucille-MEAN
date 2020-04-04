import { IUsuarioModel } from '../modelo/interfaces/iUsuarioModel';
import { RepositoryBase } from './generico/base';
import UsuarioSchema from '../modelo/usuarioModelo';
import { utils } from '../utlis';
import { IConsultaModel } from '../modelo/interfaces/iConsulta';

export class UsuarioRepositorio extends RepositoryBase<IUsuarioModel> {
    constructor() {
      super(UsuarioSchema);
    }

    public crear(item: IUsuarioModel) : Promise<IUsuarioModel> {
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
      return <Promise<IUsuarioModel>>p;      
    }

    public modificar(item: IUsuarioModel) : Promise<IUsuarioModel> {
      let p = new Promise((resolve, reject) => {        
  
        this.update(item._id, item, (err: Error, res: any) => {
          if (err) {
            reject(err);
          }
          else {            
            if (res.ok) {
              this.findById(item._id, (err: Error, db: IUsuarioModel)=>{
                resolve(db);
              });              
            }
          }
        });            
      });      
      return <Promise<IUsuarioModel>>p;      
    }

    public eliminar(id: string) : Promise<IUsuarioModel> {
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
      return <Promise<IUsuarioModel>>p;      
    }

    public eliminarLogico(id: string) : Promise<IUsuarioModel> {
      let p = new Promise((resolve, reject) => {        
  
        let item = <IUsuarioModel>{
          _id: id,
          eliminado: true,                  
        };
        console.log('llego aqui');
        this.update(item._id, item, (err: Error, res: any) => {
          if (err) {
            reject(err);
          }
          else {            
            resolve(res);
          }
        });            
      });      
      return <Promise<IUsuarioModel>>p;      
    }

    public consultar(criterio: IConsultaModel<IUsuarioModel>) : Promise<IUsuarioModel> {
      let p = new Promise((resolve, reject) => {
        let regEx = new RegExp(criterio.item.nombre, 'i');
        
        let desde = criterio.pagina === 1 ? 0 : (criterio.pagina - 1) * criterio.tamanio;    
        let _criterio = { nombre: regEx, eliminado: criterio.item.eliminado };
        this.find(_criterio)
            .sort([[criterio.orden, criterio.direccion]])
            .skip(desde)
            .limit(criterio.tamanio) //orden y paginacion            
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
                  resolve({
                    items: res,
                    pagina: criterio.pagina,
                    tamanioPagina: criterio.tamanio,
                    totalItems: total,
                    totalPaginas: utils.numeroPaginas(total, criterio.tamanio)
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
      
      return <Promise<IUsuarioModel>>p;
    }

    public obtener(id: string) : Promise<IUsuarioModel> {
      let p = new Promise((resolve, reject) => {
        
        this.findById(id, (err: Error, res: IUsuarioModel) => {
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
      
      return <Promise<IUsuarioModel>>p;
    }
  }