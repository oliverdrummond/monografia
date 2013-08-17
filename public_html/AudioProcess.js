try {
        var contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
        var context = new contextClass();
        if (contextClass) {
        alert("context created, you are doing fine"); //test
        }
}
catch (e) {
    alert('Sorry, your browser does not support the Web Audio API.');
}

var i = 440;
//Criação do Nó do Oscilador
oscillatorTwo = context.createOscillator();
oscillatorTwo.type = 1;
oscillatorTwo.frequency.value = i * 4;

//Ligar o oscilador
var botaoLigar = document.getElementById("bLigar");
botaoLigar.onclick = function(){
    oscillatorOne = context.createOscillator();
    oscillatorOne.type = 2;
    oscillatorOne.frequency.value = i;
    oscillatorOne.noteOn(0);
    oscillatorOne.connect(context.destination);
};

//Desligar o oscilador
var botaoDesligar = document.getElementById("bDesligar");
botaoDesligar.onclick = function(){
    oscillatorOne.noteOff(0);
};

//Aumentar um semitom no oscilador
var botaoAumentarFreq = document.getElementById("bAumentarFreq");
botaoAumentarFreq.onclick = function(){
    var semitoneRatio = Math.pow(2, 1/12);
    i =  semitoneRatio * i;
    oscillatorOne.frequency.value = i;
};

//Diminuir um semitom no oscilador
var botaoDiminuirFreq = document.getElementById("bDiminuirFreq");
botaoDiminuirFreq.onclick = function(){
    var semitoneRatio = Math.pow(2, 1/12);
    i =  i / semitoneRatio;
    oscillatorOne.frequency.value = i;
};

//Ligar Delay
var botaoLigarDelay = document.getElementById("bLigarDelay");
botaoLigarDelay.onclick = function(){
    var delayNode = context.createDelayNode();
    delayNode.delayTime.value = 30;
    oscillatorOne.connect(delayNode);
    delayNode.connect(context.destination);
};

//Desligar Delay
var botaoDesligarDelay = document.getElementById("bDesligarDelay");
    botaoDesligarDelay.onclick = function(){
    oscillatorOne.disconnect(0); 
    delayNode.disconnect(0);
    oscillatorOne.connect(context.destination);
};

//Carregar um buffer
//var request = new XMLHttpRequest(); request.open('GET', url, true); request.responseType = 'arraybuffer';
//request.onload = function() {
//    context.decodeAudioData(request.response, function(theBuffer) { buffer = theBuffer;
//    }, onError);
//};
//request.send();
//    
//    function playSound(buffer) {
//var source = context.createBufferSource(); source.buffer = buffer; source.connect(context.destination); source.start(0);
//}