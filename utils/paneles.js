import { crearBoton, crearDiv, crearInput, crearLabel, crearSection } from "./elementos";

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


