export default class utils{
    static numeroPaginas = (total: number, tamanio: number): number => {
        let nro = Math.round(total / tamanio);
        if (nro * tamanio < total) {
            nro += 1;
        }
        return nro;
    }

    
}