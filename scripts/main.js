const form = document.getElementById("formInicio");
console.log(form);

/*const btn = document.getElementById("btn");
console.log(btn);*/
form.addEventListener("submit", function(event){
    event.preventDefault()
    const formData = new FormData(form, btn);
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
    .catch(err => console.error("error", err), alert("hubo problemas en el servidor"));
})




