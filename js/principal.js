var temps = 10;         // Temps per a cada pregunta
var preguntaActual;     // Pregunta actual
var posPregunta;        // Posició de la pregunta actual
var maxPreguntes;       // Num maxim de preguntes
var intTemps = null;    // Interval amb el contador de temps

window.onload = function () {
    creaCookieSiExiste(0, 1);
    creaCookieSiExiste(1, 2);
    creaCookieSiExiste(2, 1);
}

function creaCookieSiExiste(numPregunta, valor) {
    if (!getCookie("Pregunta" + numPregunta)) {
        setCookie("Pregunta" + numPregunta, valor, 100);
    }
}



// Funció per a crear una pregunta
function crearPregunta(id, pregunta, resposta1, resposta2) {
    return {
        id: id,
        pregunta: pregunta,
        resposta1: resposta1,
        resposta2: resposta2
    }
}

// Llistat de preguntes
var preguntes = [
    crearPregunta(0, "Com es diu el creador del joc?", "Marc", "Pedro"),
    crearPregunta(1, "Com es diu el professor?", "Test", "Antonio"),
    crearPregunta(2, "Que ha utilitzat per guardar les respostes?", "Cookies", "Variables")
]

// Comença el joc
function start() {
    posPregunta = 0;
    preguntaActual = null;
    maxPreguntes = preguntes.length;

    MostraPregunta();
}

// Mostra la pregunta actual y dona temps per a respondre
function MostraPregunta() {
    preguntaActual = preguntes[posPregunta];

    $("#pregunta").html(preguntaActual.pregunta);
    $("#textResposta1").html(preguntaActual.resposta1);
    $("#textResposta2").html(preguntaActual.resposta2);

    $("#temps").html(temps);
    intTemps = setInterval(function () {
        $("#temps").html(temps - 1);

        temps--;

        if (temps == 0) {
            clearInterval(intTemps);

            var resposta = getSeleccionat("resposta");

            // Valida la resposta passant test com a callback
            ValidarRespuesta(preguntaActual.id, resposta, test);
        }
    }, 1000);
}

// Valida la resposta donada y envia el resultat al callback passat per parametre
function ValidarRespuesta(codiPregunta, codiResposta, callbackResultat) {
    var respostaCorrecta = getCookie("Pregunta" + codiPregunta);

    callbackResultat(codiPregunta, respostaCorrecta == codiResposta);
}

/* Mostra per pantalla la informació del resultat de la pregunta durant 10 segons
 Acte seguit mostra la seguent pregunta */
function test(codiPregunta, resultatbool) {

    var resultat = $("#resultat");
    var codi = $("#codi");

    codi.html(codiPregunta);
    if (resultatbool) {
        resultat.html("Correcte");
    } else {
        resultat.html("Incorrecte");
    }

    // Neteja la info del estat de la jugada i mostra la seguent pregunta despres de mostrar el resultat 10 segons
    setTimeout(function () {
        temps = 10;
        posPregunta++;

        resultat.html("");
        codi.html("");

        if (maxPreguntes > posPregunta) {
            MostraPregunta();
        } else {
            alert("Joc finalitzat!");
        }
    }, 1 * 1000);
}

// Retorna el valor del radiobutton seleccionat
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