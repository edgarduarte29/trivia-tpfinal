/*
Archivo: script.js
Script general para elementos gráficos del template html,
navegación y funciones auxiliares.
*/

// Expande y contrae el menú en vísta móvil
// ... alternando la clase "collapse" de bootstrap
document.querySelector('.navbar-toggler').addEventListener('click', function () {
  document.querySelector('.navbar-collapse').classList.toggle('collapse');
});


// Inicia el juego si en el link se indica el anchor #jugar
// Se utiliza para disparar la acción con el botón de la página de instrucciones.
let jugar = (window.location.hash == '#jugar');
if (jugar) {
  iniciarJuego();
}


//Muestra pantalla acerca de
function mostrarAcercaDe()
{
	document.querySelector('#pantalla-inicio').classList.add('d-none');
	document.querySelector('#pantalla-juego').classList.add('d-none');
	document.querySelector('#pantalla-resultado').classList.add('d-none');
	document.querySelector('#pantalla-acerca_de').classList.remove('d-none');
}


// Muestra pantalla de acerca de si en el link se indica el anchor #acerca_de
let acerca_de = (window.location.hash == '#acerca_de');
if (acerca_de) {
  mostrarAcercaDe();
}

/********FUNCIONES AUXILIARES***************/
// Retorna un número aleatorio >= 0 y < n
function randomN (n) {
  return Math.floor(Math.random() * n);
}

// Desordena un array
function desordenarArray (array) {
  let longitud = array.length;

  // Recorre el array
  for (let i=0; i < longitud; i++)
  {
    // Intercambia de lugar el valor del elemento acutal
    //...con el valor de otro elemento aleatorio
    let rand = randomN(longitud);
    let temp = array[i];
    array[i] = array[rand];
    array[rand] = temp;
  }
}