
const search = document.getElementById("search");
const Enviar = document.getElementById("Enviar");

Enviar.addEventListener('click', ()=>{
let user = search.value;
fetch('busqueda')
    method:'post',
    headers;{
        'content-type'='application/json'
    }
    body:json.stringify({nombre:user})
});
