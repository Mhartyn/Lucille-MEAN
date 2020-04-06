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

    constructor(item: T, pagina: number | undefined, orden: string, direccion: number | undefined, tamanio: number | undefined){
        this.item = item;
        this.orden = orden; 
        this.direccion = direccion ? direccion : 1; 
        this.pagina = pagina ? pagina : 1; 
        this.tamanio = tamanio ? tamanio : 5;
    }

    desde () : number{
        return this.pagina === 1 ? 0 : (this.pagina - 1) * this.tamanio;
    }
}