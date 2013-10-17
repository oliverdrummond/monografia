try {
    var contextClass = (window.AudioContext 
            || window.webkitAudioContext 
            || window.mozAudioContext 
            || window.oAudioContext 
            || window.msAudioContext);
    var context = new contextClass();
} catch (e) {
    alert('Infelizmente o seu navegador não é compatível com a Web Audio API, tente baixar o Google Chrome para poder utilizar nosso site');
}