import { crearBoton, crearDiv, crearInput, crearLabel, crearSection, crearUl } from "./elementos";
import { mostrarMensaje, obtenerVeterinarias } from "./funciones";
import { Veterinaria } from "../models/Veterinaria";


// paneles
export function panelAgregarVet(red) {
  const contenedor = crearSection("modal-agregar-vet", "modal-agregar");
  const div = crearDiv();

  const divContenedorDireccion = crearDiv();
  const labelDireccion = crearLabel("Direccion");
  const inputDireccion = crearInput("inputDireccion", "inp", "text", "Ej. Calle 1234");

  contenedor.appendChild(div);
  div.appendChild(divContenedorDireccion);
  divContenedorDireccion.appendChild(labelDireccion);
  divContenedorDireccion.appendChild(inputDireccion);


  const div2 = crearDiv()
  const divContenedorNombre = crearDiv();
  const labelNombre = crearLabel("Nombre:");
  const inputNombre = crearInput("inputNombre", "inp", "text", "Juan Perez");

  const btnAgregar = crearBoton("Agregar", "btnAgregar", "btn-primario", "button");
  btnAgregar.classList.add("mx-2");

  btnAgregar.addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    const direccion = inputDireccion.value.trim();
  
    if (!nombre || !direccion) {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    // Generar un ID único para la nueva veterinaria
    const id = `vet-${Date.now()}`;
  
    // Crear una nueva instancia de Veterinaria
    const nuevaVeterinaria = new Veterinaria(id, nombre, direccion);
  
    // Agregar la nueva veterinaria a la red
    red.darAltaVeterinaria(nuevaVeterinaria);
  
    // Actualizar la lista visualmente
    const listaVeterinarias = document.getElementById("listaVeterinarias");
    if (listaVeterinarias) {
      const li = document.createElement("li");
      li.classList.add("flex", "item");
      li.innerText = `ID: ${id}, Nombre: ${nuevaVeterinaria.nombre}, Dirección: ${nuevaVeterinaria.direccion}`;
      listaVeterinarias.appendChild(li);
    }
  
    // Limpiar los campos de entrada
    inputNombre.value = "";
    inputDireccion.value = "";
  });
  

  const btnCancelar = crearBoton("Cancelar", "btnCancelar", "btn-eliminar", "button");
  btnCancelar.addEventListener("click", () => {
    const modal = document.getElementById("modal-agregar-vet");
    if (modal) {
      modal.remove();
    }
  })

  contenedor.appendChild(div2);
  contenedor.appendChild(btnAgregar);
  contenedor.appendChild(btnCancelar);
  div2.appendChild(divContenedorNombre);
  divContenedorNombre.appendChild(labelNombre);
  divContenedorNombre.appendChild(inputNombre);

  document.body.appendChild(contenedor);

  return contenedor;
}




export async function verListaVeterinaria(red) {

  try {
    const listaVeterinas = await obtenerVeterinarias();

    console.log(listaVeterinas);
    const contenedorLayout = crearSection("contenedorLayout", "modal-panel");
    const divContenedor = crearDiv("div-contenedor", "centrar-contenedor");
    divContenedor.classList.add("divContenedor")

    const contenedor = crearSection("contenedorVet", "centrar-contenedor")
    const div = crearDiv();
    const contenedorDeLista = crearUl("listaVet", "")

    listaVeterinas.forEach(veterinaria => {
      const li = document.createElement("li");
      li.classList.add("flex");
      li.classList.add("item");
      const lNombre = crearLabel("Nombre:", "", "lNombre");
      const nombreVet = document.createElement("h2");
      nombreVet.textContent = veterinaria.nombre
      nombreVet.classList.add("mx-2")
      const lDireccion = crearLabel("Direccion:", "", "lDireccion");
      const direcVet = document.createElement("h2")
      direcVet.classList.add("mx-2")
      direcVet.textContent = veterinaria.direccion;
      const btnModificarVet = crearBoton("Modificar", "modificar", "btn-modificar");
      btnModificarVet.classList.add("mx-2")
      const btnEliminarVet = crearBoton("Eliminar", "Eliminar", "btn-eliminar");


      li.appendChild(lNombre);
      li.appendChild(nombreVet);
      li.appendChild(lDireccion);
      li.appendChild(direcVet);
      li.appendChild(btnModificarVet);
      li.appendChild(btnEliminarVet);
      contenedorDeLista.appendChild(li);

      btnEliminarVet.addEventListener("click", () => {
        red.darBajaVeterinaria(veterinaria.id)
        li.remove();
        mostrarMensaje(`Veterinaria ${veterinaria.nombre} eliminada!`)
      })

    });



    const btnAgregarVet = crearBoton("Agregar", "Agregar", "btn-mostrar");
    btnAgregarVet.classList.add("mx-2");
    const btnBorrarList = crearBoton("Borrar lista", "btnSalirModal", "btn-eliminar");
    btnBorrarList.classList.add("mx-2");
    const btnCancelarList = crearBoton("Salir", "btnSalir", "btn-primario");
    btnCancelarList.classList.add("mx-2");

    contenedorLayout.appendChild(divContenedor);

    divContenedor.appendChild(contenedor);
    contenedor.appendChild(contenedorDeLista);

    contenedor.appendChild(div);
    div.appendChild(btnAgregarVet);
    div.appendChild(btnBorrarList);
    div.appendChild(btnCancelarList);

    btnAgregarVet.addEventListener("click", () => {
      const modal = document.getElementById("modal-agregar-vet");
      if (!modal) {
        panelAgregarVet();
      }
    })

    btnCancelarList.addEventListener("click", () => {
      const modal = document.getElementById("contenedorLayout");
      if (modal) {
        modal.remove();
      }

    })

    document.body.appendChild(contenedorLayout);

  } catch (error) {
    console.error('Error al cargar veterinarias:', error);
  }

}