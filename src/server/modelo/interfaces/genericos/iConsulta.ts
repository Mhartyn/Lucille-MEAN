export interface IConsultaModel<T>{
    item: T;
    orden: string; 
    direccion: number; 
    pagina: number; 
    tamanio: number;
    desde(): number;
}

export default class ConsultaModel<T> implements IConsultaModel<T>{    
    item: T;
    orden: string; 
    direccion: number; 
    pagina: number; 
    tamanio: number;

    constructor(item: T, orden: string, direccion: number, pagina: number, tamanio: number){
        this.item = item;
        this.orden = orden; 
        this.direccion = direccion; 
        this.pagina = pagina; 
        this.tamanio = tamanio;
    }

    desde () : number{
        return this.pagina === 1 ? 0 : (this.pagina - 1) * this.tamanio;
    }
}