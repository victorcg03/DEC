let errorNombre = "";
let errorApellido = "";
let errorMail = "";
let errorPass1 = "";
let errorPass2 = "";
let errorIp = "";
let errorDni = "";
let password;
function textoCorrecto(valor){
    let letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z', ' '];
    for (let i = 0; i < valor.length; i++) {
        caracter = valor.substr(i, 1);
        if (!letras.includes(caracter.toUpperCase())) {
            return false;
        }
    }
    return true;
}

function comprobarNombre(input){
    if (!textoCorrecto(input.value)) {
        errorNombre = "El nombre introducido no es valido \n";
        console.log(errorNombre);
        input.classList.add('noValido');
        input.classList.remove('Valido');
    } else {
        errorNombre = "";
        input.classList.remove('noValido');
        input.classList.add('Valido');
    }
}
function comprobarApellido(input){
    if (!textoCorrecto(input.value)) {
        errorApellido = "El apellido introducido no es valido \n";
        console.log(errorApellido);
        input.classList.add('noValido');
        input.classList.remove('Valido');
    } else {
        errorApellido = "";
        input.classList.remove('noValido');
        input.classList.add('Valido');
    }
}
function comprobarMail(input){
    let mail = input.value;
    let correcto = mail.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!correcto) {
        errorMail = "El mail introducido no es valido \n";
        console.log(errorMail);
        input.classList.add('noValido');
        input.classList.remove('Valido');
    } else {
        errorMail = "";
        input.classList.remove('noValido');
        input.classList.add('Valido');
    }
}
function comprobarDni(input){
    let dni = input.value;
    if (!validar(dni)) {
        errorDni = "El DNI introducido no es valido \n";
        console.log(errorDni);
        input.classList.add('noValido');
        input.classList.remove('Valido');
    } else {
        errorDni = "";
        input.classList.remove('noValido');
        input.classList.add('Valido');
    }
}
function comprobarPass(input){
    password = input.value;
    let correcto = password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/);
    if (!correcto) {
        errorPass1 = "La contraseña introducida no cumple los requisitos";
        input.classList.add('noValido');
        input.classList.remove('Valido');
    } else {
        errorPass1 = "";
        input.classList.remove('noValido');
        input.classList.add('Valido');
    }
}
function comprobarRepetir(input){
    if(input.value != password){
        errorPass2 = "Las contraseñas no coinciden";
        input.classList.add('noValido');
        input.classList.remove('Valido');
    } else {
        errorPass2 = "";
        input.classList.remove('noValido');
        input.classList.add('Valido');
    }
}
function comprobarIp(input){
    let ip = input.value;
    let correcto = ip.match(/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/i);
    if(!correcto){
        errorIp = "La IP introducida no es valida";
        input.classList.add('noValido');
        input.classList.remove('Valido');
    } else {
        errorIp = "";
        input.classList.remove('noValido');
        input.classList.add('Valido');
    }
}
function informarUsuario(){
    if (errorApellido != "" || errorNombre != "" || errorMail != "" || errorPass1 != "" || errorPass2 != "" || errorIp != "" || errorDni != "") {
        alert("El formulario no es correcto: \n" + errorNombre + errorApellido + errorMail + errorPass1 + errorPass2 + errorIp + errorDni);
    } else {
        alert("Formulario correcto");
    }
}

function validar(value){

    var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    var nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    var str = value.toString().toUpperCase();
  
    if (!nifRexp.test(str) && !nieRexp.test(str)) return false;
  
    var nie = str
        .replace(/^[X]/, '0')
        .replace(/^[Y]/, '1')
        .replace(/^[Z]/, '2');
  
    var letter = str.substr(-1);
    var charIndex = parseInt(nie.substr(0, 8)) % 23;
  
    if (validChars.charAt(charIndex) === letter) return true;
  
    return false;
}