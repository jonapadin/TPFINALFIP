import { crearBoton, crearDiv, crearInput, crearLabel, crearSection, crearUl } from "./elementos";

// paneles
export function panelAgregarVet() {
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
}

export function verListaVeterinaria(){
  const contenedorLayout = crearSection("contenedorLayout", "modal-panel");
  const divContenedor = crearDiv("div-contenedor","centrar-contenedor");
  const contenedor = crearSection("contenedorVet", "centrar-contenedor")
  const div = crearDiv();
  const contenedorDeLista = crearUl("listaVet","")
  const li = document.createElement("li");
  li.classList.add("flex");
  const nombreVet = document.createElement("h2");
  nombreVet.textContent = "Juancho";
  const direcVet = document.createElement("h2")
  direcVet.textContent = "Juancho123";

  const btnModificarVet = crearBoton("Modificar", "modificar", "btn-modificar");
  const btnEliminarVet = crearBoton("Eliminar", "Eliminar", "btn-eliminar");
  
  const btnAgregarVet = crearBoton("Agregar", "Agregar", "btn-primario");
  const btnBorrarList = crearBoton("Borrar", "Agregar", "btn-eliminar");
  const btnCancelarList = crearBoton("Cancelar", "Agregar", "btn-mostrar");

  contenedorLayout.appendChild(divContenedor);
  
  divContenedor.appendChild(contenedor);
  contenedor.appendChild(contenedorDeLista);
  
  contenedor.appendChild(div);
  div.appendChild(btnAgregarVet);
  div.appendChild(btnBorrarList);
  div.appendChild(btnCancelarList);

  contenedorDeLista.appendChild(li);
  li.appendChild(nombreVet);
  li.appendChild(direcVet);
  li.appendChild(btnModificarVet);
  li.appendChild(btnEliminarVet);

  document.body.appendChild(contenedorLayout);
}
