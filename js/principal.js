var temps = 10;
var preguntaActual;
var posPregunta;
var maxPreguntes;
var intTemps = null;


function crearPregunta(id, pregunta, resposta1, resposta2) {
    return {
        id: id,
        pregunta: pregunta,
        resposta1: resposta1,
        resposta2: resposta2
    }
}

var preguntes = [
    crearPregunta(0, "Com es diu el creador del joc?", "Marc", "Pedro"),
    crearPregunta(1, "Com es diu el professor?", "Test", "Antionio"),
    crearPregunta(2, "Que ha utilitzat per guardar les respostes?", "Cookies", "Variables")
]

function test() {
    posPregunta = 0;
    preguntaActual = null;
    maxPreguntes = preguntes.length;

    MostraPregunta();
}

function MostraPregunta() {
    preguntaActual = preguntes[posPregunta];

    $("#pregunta").html(preguntaActual.pregunta);
    $("#codi").html(preguntaActual.id);
    $("#textResposta1").html(preguntaActual.resposta1);
    $("#textResposta2").html(preguntaActual.resposta2);

    $("#temps").html(temps);
    intTemps = setInterval(function () {
        $("#temps").html(temps - 1);

        temps--;

        if (temps == 0) {
            clearInterval(intTemps);

            var resposta = getSeleccionat("resposta");

            ValidarRespuesta(preguntaActual.id, resposta);
        }
    }, 1000);
}

function ValidarRespuesta(codiPregunta, codiResposta) {
    var respostaCorrecta = getCookie("Pregunta" + codiPregunta);

    var resultat = $("#resultat");
    if (respostaCorrecta == codiResposta) {
        resultat.html("Correcte");
    } else {
        resultat.html("Incorrecte");
    }

    setTimeout(function () {
        temps = 10;
        posPregunta++;

        resultat.html("");

        if (maxPreguntes > posPregunta) {
            MostraPregunta();
        } else{
            alert("Joc finalitzat!");
        }
    }, 1000);
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