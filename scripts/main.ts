const form = document.getElementById("formInicio");
const usuario= document.getElementById("usuario");
const pass= document.getElementById("pass")
const btn = document.getElementById("btn")
const errorU = document.getElementById("errorUsuario");
const errorP = document.getElementById ("errorPass")


function validarForm(){
    let validar:boolean = true;
    errorU.remove("ocultar")   

}



/*const btn = document.getElementById("btn");
console.log(btn);*/
form?.addEventListener("submit", function(event){
    event.preventDefault()
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
