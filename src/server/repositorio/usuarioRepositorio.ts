import IUsuarioModel from '../modelo/interfaces/iUsuarioModel';
import RepositoryBase from './generico/base';
import UsuarioSchema from '../modelo/usuarioModelo';
import IConsultaModel from '../modelo/interfaces/genericos/iConsulta';
import RespuestaPaginada from '../modelo/interfaces/genericos/iRespuestaPaginada';

export default class UsuarioRepositorio extends RepositoryBase<IUsuarioModel> {
    constructor() {
      super(UsuarioSchema);
    }

    public crear(item: IUsuarioModel) : Promise<IUsuarioModel> {
      return new Promise((resolve, reject) => {        
  
        this.create(item, (err: Error, res: any) => {
          if (err) {
            reject(err);
          }
          else {
            resolve(res);
          }
        });            
      });      
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

    public eliminarLogico(item: IUsuarioModel) : Promise<IUsuarioModel> {
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
      return <Promise<IUsuarioModel>>p;      
    }

    public consultar(criterio: IConsultaModel<IUsuarioModel>) : Promise<IUsuarioModel> {
      let p = new Promise((resolve, reject) => {
        let regEx = new RegExp(criterio.item.nombre, 'i');
        
        let desde = criterio.desde();    
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
                    resolve(new RespuestaPaginada(criterio, res, total));
                  }
                  else{
                    resolve(new RespuestaPaginada(criterio, null, 0));
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
                    item: res,
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

    public obtenerEmail(email: string) : Promise<IUsuarioModel> {
      let p = new Promise((resolve, reject) => {
        
        this.findOne({email}, (err: Error, res: IUsuarioModel) => {
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
      
      return <Promise<IUsuarioModel>>p;
    }

    public inicioSesion(email: string) : Promise<IUsuarioModel> {
      let p = new Promise((resolve, reject) => {
        
        this.findOne(<IUsuarioModel>{email: email, eliminado: false}, 
          (err: Error, res: IUsuarioModel) => {
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
      
      return <Promise<IUsuarioModel>>p;
    }
  }