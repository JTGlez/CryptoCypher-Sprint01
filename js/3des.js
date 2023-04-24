/*Constantes para almacenar el botón presionado*/ 
const cifrarBtn = document.querySelector('.cifrar');
const descifrarBtn = document.querySelector('.descifrar');
let botonPresionado = '';
let mensaje = '';

/*Referencia al div de output*/
let outputSection = document.querySelector('#output-section');

/*Eventos click para identificar el botón presionado*/
cifrarBtn.addEventListener('click', () => {
  botonPresionado = 'cifrar';
});

descifrarBtn.addEventListener('click', () => {
  botonPresionado = 'descifrar';
});

  /*Recuperación de la cadena escrita en el formulario para cifrar o descifrar, según corresponda*/
  document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(e.target);
    data.append('boton', botonPresionado);
    mensaje = data.getAll("texto");
    mensaje = mensaje[0];
    console.log("Se realiza el siguiente modo con la siguiente cadena: ", botonPresionado, mensaje);
    let resultado = cryptdecrypt(botonPresionado, mensaje);
    outputSection.innerHTML = resultado;
  });


/*Función de cifrado o descifrado*/

let cifrado = '';
let descifrado = '';

 // Clave y vector de inicialización
 var key = CryptoJS.enc.Hex.parse('0123456789abcdef23456789abcdef0123456789abcdef');
 var iv = CryptoJS.enc.Hex.parse('0123456789abcdef');

function cryptdecrypt(modo, mensaje) {
    if (modo === "cifrar") {
      cifrado = CryptoJS.TripleDES.encrypt(mensaje, key, { iv: iv });
      console.log(cifrado.toString());
      return '<p class = "no-message">Texto cifrado: ' + cifrado.toString() + '</p>';

    } else if (modo === "descifrar") {
        descifrado = CryptoJS.TripleDES.decrypt(mensaje, key, { iv: iv });
        console.log(descifrado.toString(CryptoJS.enc.Utf8));
        return '<p class = "no-message">Texto descifrado: ' + descifrado.toString(CryptoJS.enc.Utf8) + '</p>';    
  }
}
  
