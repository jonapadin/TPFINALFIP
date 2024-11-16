export function crearSection(id = "", clase = "") {
  const section = document.createElement("section");

  section.id = id;

  if (clase) section.classList.add(clase);

  return section;
}

export function crearDiv(id = "", clase = "") {  // Ahora también se maneja 'clase'
  const div = document.createElement("div");

  div.id = id;

  if (clase) div.classList.add(clase);

  return div;
}

export function crearInput(id = "", clase = "", type = "", placeholder = "") {
  const input = document.createElement("input");

  input.id = id;

  if (clase) input.classList.add(clase);

  input.type = type;
  input.placeholder = placeholder;

  return input;
}

export function crearLabel(etiqueta = "", id = "", clase = "") {
  const label = document.createElement("label");

  label.id = id;

  if (clase) label.classList.add(clase);

  label.textContent = etiqueta;

  return label;
}

export function crearBoton(label = "", id = "", clase = "", type = "") {
  const btn = document.createElement("button");

  btn.id = id;

  if (clase) btn.classList.add(clase);

  btn.textContent = label;

  btn.type = type;

  return btn;
}
