import { Veterinaria } from "./Veterinaria"
import { Proveedor } from "./Proveedor"
export class RedVeterinaria{
    private veterinarias : Veterinaria [];
    private proveedores : Proveedor [];

    constructor (veterinaria:Veterinaria[],proveedor:Proveedor[]){
        this.veterinarias = veterinaria;
        this.proveedores = proveedor;
    }

    public darAltaVeterinaria(veterinaria:Veterinaria){
        this.veterinarias.push (veterinaria)
    }
    public darBajaVeterinaria(id:number){
        if(id){
            this.veterinarias.filter(vet => vet.getId() !== id)
        } else{
            console.error("No se encuentra el ID")
        }
    }

    public modificarVeterinaria(id?:number,nombre?:string,direccion?:string){
        const veterinaria = this.veterinarias.find(veterinaria => veterinaria.getId() === id)
        if (veterinaria){
            if (nombre) veterinaria.setNombre(nombre);
            if (direccion) veterinaria.setDireccion(direccion);
        }
    }

    agregarProveedor(proveedor: Proveedor) {
        this.proveedores.push(proveedor);
      }
    
      modificarProveedor(id: number, nombre?: string, telefono?: number) {
        const proveedor = this.proveedores.find(pr => pr.getId() === id);
        if (proveedor) {
          if (nombre) proveedor.setNombre(nombre);
          if (telefono) proveedor.setTelefono(telefono);
        }
      }
    
      eliminarProveedor(id: number) {
        this.proveedores = this.proveedores.filter((pr => pr.getId() !== id));
      }

      getVeterinarias(){
        return this.veterinarias
      }

      getProveedores(){
        return this.proveedores
      }



}