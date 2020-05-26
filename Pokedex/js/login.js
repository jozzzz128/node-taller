'use strict'
if(localStorage.getItem("token"))
window.location.href = "pokedex.html";

window.onload = init;

function init(){
    document.querySelector('.btn-secondary').addEventListener('click', () => {
        window.location = 'signin.html';
    });

    document.querySelector('.btn-primary').addEventListener('click', () => {
        const mail = document.querySelector('#input-mail').value;
        const pass = document.querySelector('#input-password').value;

        console.log(mail,pass);

        axios({
            method: 'post',
            url: 'http://localhost:3000/user/login',
            data: {
                user_mail: mail,
                user_password: pass
            }
        }).then(res => {
            if(res.data.code == 200){
                alert("Inicio exitoso");
                localStorage.setItem("token", res.data.message);
                window.location = "pokedex.html";
            }else{
                alert("Usuario y/0 copntraseña incorrecto");
            }
        }).catch(err => {
            console.log(err);
        });

    });
}