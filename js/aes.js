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
const clave = CryptoJS.enc.Hex.parse("0123456789abcdef0123456789abcdef"); // clave de 256 bits
const iv = CryptoJS.lib.WordArray.random(16); // IV de 16 bytes

function cryptdecrypt(modo, mensaje) {
  const textoWordArray = CryptoJS.enc.Utf8.parse(mensaje);
    if (modo === "cifrar") {
      const textoCifrado = CryptoJS.AES.encrypt(textoWordArray, clave, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
      });
      const textoCifradoBase64 = textoCifrado.toString();
      console.log(textoCifradoBase64);
      return '<p class = "no-message">Texto cifrado: ' + textoCifradoBase64 + '</p>';

  
    } else if (modo === "descifrar") {
      const textoDescifradoWordArray = CryptoJS.AES.decrypt(mensaje, clave, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
      });
      const textoDescifrado = CryptoJS.enc.Utf8.stringify(textoDescifradoWordArray);
      console.log( textoDescifrado);
      return '<p class = "no-message">Texto descifrado: ' + textoDescifrado + '</p>';;
    }
  }
  
