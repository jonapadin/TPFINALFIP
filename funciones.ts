import * as readlineSync from 'readline-sync';
import * as fs from 'fs';

import { Proveedor, RedVeterinaria, Veterinaria } from './models';

function guardarEnArchivo(nombreArchivo: string, datos: any[]): void {
    try {
        // Convertir los datos a formato JSON
        const contenido = JSON.stringify(datos, null, 2); // El "2" es para formatear el JSON con indentación para que sea legible
        
        // Guardar el contenido en un archivo .json
        fs.writeFileSync(nombreArchivo, contenido, 'utf8');
        console.log(`El archivo se guardó correctamente como ${nombreArchivo}`);
    } catch (err) {
        // Si ocurre un error, lo capturamos y mostramos el mensaje
        console.error("Hubo un error al guardar el archivo: ", err);
    }
}

export function obtenerDatosDesdeArchivo(nombreArchivo: string): any[] {
    try {
        // Leer el archivo .json
        const contenido = fs.readFileSync(nombreArchivo, 'utf8');

        // Convertir el contenido JSON en un objeto JavaScript
        const datos = JSON.parse(contenido);

        // Devolver los datos (ahora un array de objetos)
        return datos;
    } catch (err) {
        console.error("Hubo un error al leer el archivo: ", err);
        return []; // Devuelve un array vacío si hubo un error
    }
}

//Menu red veterinaria

export function agregarVeterinaria(redVeterinaria: RedVeterinaria) {
    const nombre = readlineSync.question("Nombre de la veterinaria: ");
    const direccion = readlineSync.question("Dirección: ");
    const nuevaVeterinaria = new Veterinaria(nombre, direccion);
    // Agregar veterinaria a la red
    redVeterinaria.darAltaVeterinaria(nuevaVeterinaria);
    console.log("Veterinaria agregada", nuevaVeterinaria);



    // Guardar veterinarias
    guardarEnArchivo('veterinarias.txt', redVeterinaria.getVeterinarias());
    
}

export function obtenerVeterinaria(nuevaVeterinaria:Veterinaria) {
    return nuevaVeterinaria;
}

export function modificarVeterinaria(redVeterinaria: RedVeterinaria) {
    const buscar = readlineSync.questionInt("ID de la veterinaria a actualizar:");
    const nuevoNombre = readlineSync.question("Nuevo nombre:");
    const nuevaDireccion = readlineSync.question("Nueva direccion:");
    redVeterinaria.modificarVeterinaria(buscar,nuevoNombre,nuevaDireccion);
    console.log("Lista actualizada:", redVeterinaria.getVeterinarias());

    guardarEnArchivo('veterinarias.txt', redVeterinaria.getVeterinarias());

}

export function eliminarVeterinaria(redVeterinaria: RedVeterinaria) {
    const buscarId = readlineSync.questionInt("ID de la veterinaria a eliminar:")
    redVeterinaria.darBajaVeterinaria(buscarId);
    console.log("Lista actualizada:", redVeterinaria.getVeterinarias());
    guardarEnArchivo('veterinarias.txt', redVeterinaria.getVeterinarias());

}


//Menu red Proveedores

export function agregarProveedor(redVeterinaria: RedVeterinaria) {
    const nombreProveedor= readlineSync.question("Nombre del proveedor: ");
            const Telefono  = readlineSync.question("Telefono: ");
            const proveedor1 = new Proveedor(nombreProveedor, Telefono );

            redVeterinaria.agregarProveedor(proveedor1);

            console.log("Proveedores en la red después de agregar:", redVeterinaria.getProveedores());

            guardarEnArchivo('proveedores.txt', redVeterinaria.getProveedores());
}

export function modificarProveedor(redVeterinaria: RedVeterinaria) {
    const buscar = readlineSync.questionInt("ID del proveedor:");
    const nuevoNombreProv = readlineSync.question("Nuevo nombre:");
    const nuevaTelefono = readlineSync.question("Nuevo telefono:");
    redVeterinaria.modificarProveedor(buscar,nuevoNombreProv,nuevaTelefono);
    console.log("Lista actualizada:", redVeterinaria.getProveedores());
    guardarEnArchivo('proveedores.txt', redVeterinaria.getProveedores());
}

export function eliminarProveedor(redVeterinaria: RedVeterinaria) {
    const buscarIdProv = readlineSync.questionInt("ID del proveedor a eliminar:")
    redVeterinaria.eliminarProveedor(buscarIdProv);
    console.log("Lista actualizada:", redVeterinaria.getProveedores()); 
    guardarEnArchivo('proveedores.txt', redVeterinaria.getProveedores());
}


//