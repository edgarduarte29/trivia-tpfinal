/* 
Archivo mi_codigo.js
En este archivo programaremos el código correspondiente al juego de Trivia Informática.
 */

// Declara las variables
let  indice_pregunta_actual;
let  total_puntos;

// Declara constantes
const nombre_alumno = "Edgar Duarte, Gianluca Boffa, Valentín Dominguez y Mateo Cañievsky";
const maximo_preguntas_por_jugada = 4;
const puntos_resultado_bien = 3;


// *******************************
// Mostrar resultado
function mostrarResultado () {
  //Oculta la pantalla de juego
  document.querySelector('#pantalla-juego').classList.add('d-none');
  //Quita los estilos condicionales a la pantalla de resultado
  document.querySelector('#pantalla-resultado').classList.remove('bien');
  document.querySelector('#pantalla-resultado').classList.remove('mal');

  //Verifica si el resultado es bien o mal y 
  //...le agrega la clase a la pantalla del resultado
  if (total_puntos >= puntos_resultado_bien) {
    document.querySelector('#pantalla-resultado').classList.add('bien');
  }
  else {
    document.querySelector('#pantalla-resultado').classList.add('mal');
  }

  //Agrega el total de puntos a la pantalla resultado
  document.querySelector('#resultado-puntos').textContent = total_puntos;
  //Muestra la pantalla resultado
  document.querySelector('#pantalla-resultado').classList.remove('d-none');
}


// *******************************
// Muestra una pregunta
function mostrarPregunta (pregunta) {
  document.querySelector('#pregunta-numero').textContent = (indice_pregunta_actual+1) + ') ';
  document.querySelector('#pregunta-texto').textContent = pregunta.texto_pregunta;
  document.querySelector('#pregunta-imagen').src = pregunta.imagen_src;

  // Obtiene los elementos <div> de las opciones (el recuadro de cada opción)
  let div_opciones = document.querySelectorAll('#opciones div');

  // Obtiene los elementos <input> dentro de las opciones
  let input_opciones = document.querySelectorAll('#opciones input');

  // Obtiene los elementos <label> dentro de las opciones
  let label_opciones = document.querySelectorAll('#opciones label');

  // Desordena las opciones de la pregunta
  desordenarArray(pregunta.opciones);
  
  for (let i = 0; i < 3; i++) {
    // quita las clases correcta y erronea
    div_opciones[i].classList.remove('correcta');
    div_opciones[i].classList.remove('erronea');

    // deschequea el radio button
    input_opciones[i].checked = false;

    // en el value del <input> pone el texto de la opción
    input_opciones[i].value = pregunta.opciones[i];

    // dentro del <label> escribe el texto de la opción
    label_opciones[i].textContent = pregunta.opciones[i];
  }
}

// *******************************
// Obtiene la siguiente pregunta siempre que haya una
// ...y no se haya superado el número máximo configurado
function obtenerSiguientePregunta () {
  // Incremente el número de pregunta actual
  indice_pregunta_actual++;

  // Si quedan preguntas y no se superó el máximo
  if (indice_pregunta_actual < preguntas.length && indice_pregunta_actual < maximo_preguntas_por_jugada)
  {
    return preguntas[indice_pregunta_actual];
  }
  else
  {
    // Sino: retorna null para indicar que se terminó la jugada
    return null;
  }
}

// *********************************
// Inicia el juego ocultando el bloque HTML de la portada y
// ... mostrando el bloque HTML correspondiente al juego.
// Se utiliza la clase de bootstrap d-none
function iniciarJuego () {
   // Oculta la pantalla de inicio y pantalla de resultados,
  document.querySelector('#pantalla-inicio').classList.add('d-none');
  document.querySelector('#pantalla-resultado').classList.add('d-none');
  
  // Muestra el header y la pantalla de juego.
  document.querySelector('#header').classList.remove('d-none');
  document.querySelector('#pantalla-juego').classList.remove('d-none');

  // Reinicia las variables de seguimiento de la jugada
  indice_pregunta_actual = 0;
  total_puntos = 0;
  
  // Desordena las preguntas
  desordenarArray(preguntas);

  // Muestra la primera pregunta
  mostrarPregunta(preguntas[indice_pregunta_actual]);
}

// *********************************
// Activa el botón jugar de la página de inicio.
let boton_jugar=document.querySelector('#inicio-boton-jugar');
boton_jugar.addEventListener('click',iniciarJuego);

// *********************************
//Muestra el nombre del alumno en "Acerca De"
let html_nombre_alumno = document.querySelector('.vista-nombre');
html_nombre_alumno.textContent = nombre_alumno;

// Verifica la respuesta de la pregunta actual.
function verificarPreguntaActual () {
  let pregunta = preguntas[indice_pregunta_actual];

  let input_opciones = document.querySelectorAll('input');
  
  // Recorre todas las opciones
  for (let opcion of input_opciones) {
    // Obtiene el elemento <div> (el recuadro) que contiene a la opción
    // El <div> de cada opción tiene una clase con el mismo nombre que el id del <input>
    let recuadro = document.querySelector("." + opcion.id);

    if (opcion.value == pregunta.respuesta_correcta) {
      recuadro.classList.add('correcta');
      if (opcion.checked) {
        total_puntos++;
      }
    }
    else
    {
      if (opcion.checked) {
        recuadro.classList.add('erronea');
      }
    }
  }
}

//Acciones del boton Verificar
function manejadorBotonVerificar() {
	
	//Verifica que haya una opción seleccionada.
	let opcion_seleccionada=document.querySelector('input:checked');
	if (opcion_seleccionada) {
		// Verifica si la pregunta fue bien contestada
		verificarPreguntaActual();
		document.querySelector('#boton-verificar').classList.add('d-none');
		document.querySelector('#boton-siguiente').classList.remove('d-none');
	}
	
	// Si no hay una opción seleccionada no hace nada
	
}
let boton_verificar = document.querySelector('#boton-verificar');
boton_verificar.addEventListener('click', manejadorBotonVerificar);

//Acciones del botón Siguiente
function manejadorBotonSiguiente() {
	let pregunta = obtenerSiguientePregunta();
	if (pregunta != null) {
	  mostrarPregunta(pregunta);
	}
	else {
	  mostrarResultado();
	}
	document.querySelector('#boton-siguiente').classList.add('d-none');
	document.querySelector('#boton-verificar').classList.remove('d-none');
}
let boton_siguiente = document.querySelector('#boton-siguiente');
boton_siguiente.addEventListener('click', manejadorBotonSiguiente );

// Activa el botón volver a jugar de la página de resultados.
let boton_volver_a_jugar=document.querySelector('#resultado-boton-volver-a-jugar');
boton_volver_a_jugar.addEventListener('click',iniciarJuego);
