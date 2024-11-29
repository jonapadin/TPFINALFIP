export interface Fs{
    guardarArchivo(nombreArchivo: string, datos: any[]):void;
    actualizarArchivo():void;
    leerArchivo():void;
}