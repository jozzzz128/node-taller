'use strict'
if(localStorage.getItem("token"))
window.location.href = "pokedex.html";

window.onload = init;

function init(){
    
    document.querySelector('.btn-secondary').addEventListener('click', () => {
        window.location = 'login.html';
    });


    document.querySelector('.btn-primary').addEventListener('click', () => {
        const name = document.querySelector('#input-name').value;
        const mail = document.querySelector('#input-mail').value;
        const pass = document.querySelector('#input-password').value;

        axios({
            method: 'post',
            url: 'http://localhost:3000/user/signin',
            data: {
                user_name: name,
                user_mail: mail,
                user_password: pass
            }
        }).then(res => {
            console.log(res);
            alert("Registro Exitoso");
            window.location.href = "login.html";
        }).catch(err => {
            console.log(err);
        });

    });
}