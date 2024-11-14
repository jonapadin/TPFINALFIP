const form = document.getElementById("formInicio") as HTMLFormElement;
const usuario = document.getElementById("usuario") as HTMLInputElement;
const pass = document.getElementById("pass") as HTMLInputElement;
const btn = document.getElementById("btn") as HTMLButtonElement ;
const errorU = document.getElementById("errorUsuario") as HTMLSpanElement;
const errorP = document.getElementById("errorPass") as HTMLSpanElement;

function validarForm(): boolean {
    let esValido = true;
    if(!usuario.value.trim()){
         errorU.classList.remove("ocultar");
         esValido = false;
    } else {
        errorU.classList.add("ocultar");
    }

    if(!pass.value.trim()){
        errorP.classList.remove("ocultar");
        esValido = false;
   } else {
       errorP.classList.add("ocultar");
   }

   return esValido
}

form?.addEventListener("submit", function(event){
    event.preventDefault();

    if(!validarForm){
        return
    }

    const formData = new FormData(form as HTMLFormElement, btn as HTMLElement);
    console.log(formData);

    const url = "../Utils/usuarios.json"

    fetch(url)
    .then(resp => resp.json())
    .then(data =>{
        if(data.success){
            window.location.href="dashboard.html"
        }else{
            alert("Usuario o contraseña incorrectos")
        }
        console.log(data);    
    })
    .catch(err => console.error("error", err));
})