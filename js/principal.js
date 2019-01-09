var temps = 10;
var preguntaActual = null;
var posPregunta = 0;

window.onload = function(){
    MostraPregunta();
}

function crearPregunta(id, pregunta, resposta1, resposta2){
    return {
        id: id,
        pregunta: pregunta,
        resposta1: resposta1,
        resposta2: resposta2
    }
}

var preguntes = [
    crearPregunta(0, "Com es diu el creador del joc?", "Marc", "Pedro"),
    crearPregunta(1, "Com es diu el creador del joc?", "Marc", "Pedro"),
    crearPregunta(2, "Com es diu el creador del joc?", "Marc", "Pedro")
]


function MostraPregunta(){
    preguntaActual = preguntes[posPregunta];

    $("#pregunta").html(preguntaActual.pregunta);
    $("#textResposta1").html(preguntaActual.resposta1);
    $("#textResposta2").html(preguntaActual.resposta2);

    setInterval(function(){
        $("#temps").html(temps);

        temps--;

        if (temps == 0){
            clearInterval(this);

            var resposta = getSeleccionat("resposta");

            ValidarRespuesta(preguntaActual.id, resposta);
        }
    }, 1000);
}

function ValidarRespuesta(codiPregunta, codiResposta){
    var respostaCorrecta = getCookie("Pregunta" + codiPregunta);

    var resultat = $("#resultat");
    if (respostaCorrecta == codiResposta){
        resultat.html("Correcte");
    } else{
        resultat.html("Incorrecte");
    }

    setTimeout(function(){
        temps = 10;
        MostraPregunta();
    }, 4000);
}

function test(){

}

function getSeleccionat(nom) {
    var seleccionat;
  
    var llistat = document.getElementsByName(nom);
  
    for (var i = 0; i < llistat.length && !seleccionat; i++) {
      var actual = llistat[i];
      if (actual.checked == true) {
        seleccionat = actual.value;
      }
    }
  
    return seleccionat;
  }