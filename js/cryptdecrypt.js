

/*Constantes para almacenar el botón presionado*/ 
const cifrarBtn = document.querySelector('.cifrar');
const descifrarBtn = document.querySelector('.descifrar');
let botonPresionado = '';
let formularioData = [];
let ultimoEnvio = [];
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

const valoresDeReemplazo = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

// Invertir valoresDeReemplazo para poder descifrar
const valoresDeDescifrado = {};

for (let letra in valoresDeReemplazo) {
    const sustitucion = valoresDeReemplazo[letra];
    valoresDeDescifrado[sustitucion] = letra;
}

let cifrado = '';
let descifrado = '';

function cryptdecrypt(modo, mensaje) {
    if (modo === "cifrar") {
      cifrado = mensaje.replace(/[eiaou]/g, letra => valoresDeReemplazo[letra]);
      console.log(cifrado);
      return '<p class = "no-message">Texto cifrado: ' + cifrado + '</p>';
  
    } else if (modo === "descifrar") {
      descifrado = mensaje.replace(/enter|imes|ai|ober|ufat/g, cadena => valoresDeDescifrado[cadena]);
      return '<p class = "no-message">Texto descifrado: ' + descifrado + '</p>';
    }
  }
  
