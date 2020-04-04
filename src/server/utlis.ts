export class utils{
    static numeroPaginas = (total: number, tamanio: number): number => {
        return (total > tamanio) ? (total % tamanio) > 0 ? Math.round(total / tamanio) + 1 : Math.round(total / tamanio) : 1;
    }

    
}