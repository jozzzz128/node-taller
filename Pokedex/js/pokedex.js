'use strict'

window.onload = init;
let headers = {
    headers: {
        'Authorization' : "bearer " + localStorage.getItem("token")
    }
};
const url = "http://localhost:3000";

function init(){

    if(localStorage.getItem("token")){
        loadPokemon();
    }
    else{
        window.location.href = "login.html";
    }

}

function loadPokemon(){
    axios.get(url+"/pokemon/", headers).then(res => {
        displayPokemon(res.data.message);
    }).catch(err => {
        console.log(err);
    });
}

function displayPokemon(pokemon){
    var body = document.querySelector("body");
    var text = '<ol>';
    for(let i = 0; i < pokemon.length; i++){
        text += '<li>'+pokemon[i].pok_name+'</li>';
    }
    text += '</ol>';
    body.innerHTML += text;
}