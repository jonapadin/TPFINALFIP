import { verListaVeterinaria, panelAgregarVet } from '../utils/paneles.js';
import { cargarDatosDesdeArchivo, mostrarMensaje } from '../utils/funciones.js';
import { RedVeterinaria } from '../models/RedVeterinaria.js';


document.addEventListener("DOMContentLoaded", async () => {

  // menu desplegable
  const mostrarMenu1 = document.getElementById("mostrarMenu1");
  const mostrarMenu2 = document.getElementById("mostrarMenu2");
  const desplegable1 = document.getElementById("desplegable1");
  const desplegable2 = document.getElementById("desplegable2");

  const resultadoDiv = document.getElementById("resultado");

  const red = new RedVeterinaria();

  await cargarDatosDesdeArchivo('../bd/data.json', red);

  mostrarMensaje("Datos cargados exitosamente:");

  console.log("Veterinarias:", red.veterinarias);
  console.log("Proveedores:", red.proveedores);


  mostrarMenu1.addEventListener("click", () => {
    const modalExistente = document.querySelector("mostrarMenu1");

    if (!modalExistente) {
      verListaVeterinaria(red);
    }
  })


  // const panel = panelAgregarVet(red)
  // if (panel instanceof Node) { // Verifica que sea un nodo antes de agregarlo
  //   document.body.appendChild(panel);
  // } else {
  //   console.error("panelAgregarVet no devolvió un nodo válido");
  // };
});
