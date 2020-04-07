import utils from '../../../utlis';
import { IConsultaModel } from './iConsulta';

interface IRespuestaPaginada{
    items: any;
    pagina: number;
    orden: string;
    direccion: number;
    tamanioPagina: number;
    totalItems: number;
    totalPaginas: number;
}

export default class RespuestaPaginada<T> implements IRespuestaPaginada{
    items: any;
    pagina: number;
    orden: string;
    direccion: number;
    tamanioPagina: number;
    totalItems: number;
    totalPaginas: number;

    constructor(criterio: IConsultaModel<T>, res: any, total: number){
        this.items= res;
        this.pagina= criterio.pagina;
        this.orden= criterio.orden;
        this.direccion= criterio.direccion;
        this.tamanioPagina= criterio.tamanio;
        this.totalItems= total;
        this.totalPaginas= utils.numeroPaginas(total, criterio.tamanio);        
    }
}
