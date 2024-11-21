import * as readlineSync from 'readline-sync';
import * as fs from 'fs';

import { Cliente, Proveedor, RedVeterinaria, Veterinaria } from './models';

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

// leer veterinarias
export const leerVeterinarias = () => {
    // Leemos el archivo veterinarias.txt
    fs.readFile('veterinarias.txt', 'utf-8', (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return;
        }

        // Intentamos convertir el contenido del archivo a un objeto JavaScript (JSON)
        try {
            // Parseamos el archivo JSON
            const veterinariasTxt: { nombre: string; direccion: string; id: number }[] = JSON.parse(data);
            
            // Usamos map para convertir los objetos del JSON en instancias de la clase Veterinaria
            const listaVeterinarias: Veterinaria[] = veterinariasTxt.map((vete) => 
                new Veterinaria(vete.nombre, vete.direccion, vete.id) // Ahora pasamos el 'id' también
            );

            // Ahora tienes la lista de veterinarias, puedes recorrerla si lo necesitas
            listaVeterinarias.forEach((veterinaria, i) => {
                console.log(`Veterinaria ${i + 1}:`);
                console.log(`ID: ${veterinaria.getId()}`);
                console.log(`Nombre: ${veterinaria.getNombre()}`);
                console.log(`Dirección: ${veterinaria.getDireccion()}`);
                console.log('---');
            });

        } catch (parseError) {
            console.error('Error al parsear el contenido del archivo:', parseError);
        }
    });
};


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


// Menu clientes 

export function agregarCliente(veterinaria: Veterinaria) {
    const nombreCliente= readlineSync.question("Nombre del Cliente: ");
    const telCliente  = readlineSync.question("Telefono: ");
     const cliente1 = new Cliente(nombreCliente,telCliente);

     veterinaria.agregarCliente(cliente1);


     guardarEnArchivo('clientes.txt', veterinaria.getClientes());

    }

