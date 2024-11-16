import { verListaVeterinaria } from '../utils/paneles.js';




document.addEventListener("DOMContentLoaded", () => {

  // menu desplegable
  const mostrarMenu1 = document.getElementById("mostrarMenu1");
  const mostrarMenu2 = document.getElementById("mostrarMenu2");
  const desplegable1 = document.getElementById("desplegable1");
  const desplegable2 = document.getElementById("desplegable2");

  const resultadoDiv = document.getElementById("resultado");


  mostrarMenu1.addEventListener("click", () => {
    const modalExistente = document.querySelector("mostrarMenu1");

    if (!modalExistente) {
      verListaVeterinaria();
    }
  })

});
