//Tenemos que guardar los resultados en el local storage con dos variables, resultados y votantes
var results = {
  amlo: 0,
  meade: 0,
  anaya: 0,
  zavala: 0,
  bronco: 0
};

var voters = [];

//Cargamos el local storage en una variable
var localStorage = window.localStorage;

//Si es la primera vez que entramos a la página (local storage no tiene resultados), inizializamos variables
if (!localStorage.getItem("results")) {
  localStorage.setItem("results", JSON.stringify(results));
  localStorage.setItem("voters", JSON.stringify(voters));
}

//Variable para mantener la ine actual
var currentIne;

//Tomo el input del ine
var ineInput = document.getElementById("ine");
//Tomo el botón de login
var loginButton = document.querySelector(".login_button");

//Agrego al botón de login la función de login al hacerle click
loginButton.addEventListener("click", login);

//Variable para los candidatos
var candidatos = document.getElementsByClassName("candidate");

//Creo un arreglo a partir del objectlist que obtengo e itero por cada elemento del arreglo
Array.from(candidatos).forEach(function(candidato) {
  //Agrego la función vote cada que le den click a un candidato
  candidato.addEventListener("click", vote);
  //Obtengo el nombre del candidato que tengo actualmente
  var currentCandidate = candidato.classList[1];
  //Muestro resultados para ese candidato en el span interno
  showResults(candidato.children[0], currentCandidate);
});

//Función para validar el login
function login() {
  //Tomo el valor actual del input de INE
  var ine = ineInput.value;

  //Si no está vacío, guardo el ine actual en la variable, muestro el voting section y cierro el login section
  if (ine != "") {
    currentIne = ine;
    document.getElementById("login").classList.add("hide");
    document.getElementById("voting").classList.add("show");
  } else {
    //Si está vacío, muestro el error
    document.querySelector(".error").classList.add("show");
  }
}

//Función para mostrar resultados de la elección
function showResults(span, nombre) {
  //Se recibe un span, que es dónde irá el resultado
  //Se mantienen los resultados actuales en una variable
  var pastResults = JSON.parse(localStorage.getItem("results"));
  //Al span se le mete el valor de los resultados para ese nombre de candidato
  span.innerHTML = pastResults[nombre];
}

//Función para votar
function vote() {
  //Obtengo los votantes pasados
  var pastVoters = JSON.parse(localStorage.getItem("voters"));

  //Si la ine actual está dentro del arreglo de votantes, mostrar error
  if (containsObject(currentIne, pastVoters)) {
    document.querySelector(".error3").classList.add("show");
  } else {
    //Si no ha votado, marcar como votado
    pastVoters.push(currentIne);
    //Obtener los resultados en una variable
    var pastResults = JSON.parse(localStorage.getItem("results"));
    //Obtener el nombre del candidato por el cual se va a votar
    var currentVote = this.classList[1];
    //Sumarle un voto al candidato
    pastResults[currentVote] += 1;

    //Guardar los nuevos resultados y votantes
    localStorage.setItem("results", JSON.stringify(pastResults));
    localStorage.setItem("voters", JSON.stringify(pastVoters));

    //Actualizar el span del candidato por el cual votamos
    showResults(this.children[0], currentVote);
  }
}

//Función para determinar si un objeto está dentro de una lista
function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }
  return false;
}
