function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setHistorial(_tipo, _email){
    var object;
    var JsonHistorial;
    var historial;
    var date = new Date();
    var formatDate = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    
    object = {tipo: _tipo, email: _email, time: formatDate};
    JsonHistorial = getCookie("historial");
    
    if(JsonHistorial != ""){
        historial = JSON.parse(JsonHistorial);
    }else{
        historial = JSON.parse("[]");
    }

    historial.push(object);
    JsonHistorial = JSON.stringify(historial);
    setCookie("historial", JsonHistorial, 1);
}