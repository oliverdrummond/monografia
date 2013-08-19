try {
        var contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
        var context = new contextClass();
        if (contextClass) {
        }
}
catch (e) {
    alert('Infelizmente o seu navegador não é compatível com a Web Audio API, tente baixar o Google Chrome para poder utilizar nosso site');
}

//CRIAÇÃO DE BOTÕES
var botaoLigar = document.getElementById("bLigar");
var botaoDesligar = document.getElementById("bDesligar");
var botaoLigarDelay = document.getElementById("bLigarDelay");
var botaoDesligarDelay = document.getElementById("bDesligarDelay");
var botaoAumentarFreq = document.getElementById("bAumentarFreq");
var botaoDiminuirFreq = document.getElementById("bDiminuirFreq");
var botaoLigarLiveInput = document.getElementById("bLigarLiveInput");
var botaoDesligarLiveInput= document.getElementById("bDesligarLiveInput");
var botaoIniciarGravacao = document.getElementById("bIniciarGravacao");
var botaoPararGravacao = document.getElementById("bPararGravacao");
oscillatorGainNode = context.createGainNode();
oscillatorGainNode.connect(context.destination);

//
//OSCILADOR
//

var i = 440;

//Ligar o oscilador
botaoLigar.onclick = function(){
    botaoLigar.disabled = true;
    botaoDesligar.disabled = false;
    botaoLigarDelay.disabled = false;
    oscillatorOne = context.createOscillator();
    oscillatorOne.type = 2;
    oscillatorOne.frequency.value = i;
    oscillatorOne.noteOn(0);
    oscillatorOne.connect(oscillatorGainNode);
};

//Desligar o oscilador
botaoDesligar.onclick = function(){
    botaoLigar.disabled = false;
    botaoDesligar.disabled = true;
    botaoLigarDelay.disabled = true;
    botaoDesligarDelay.disabled = true;
    oscillatorOne.noteOff(0);   
};

//Aumentar um semitom no oscilador
botaoAumentarFreq.onclick = function(){
    var semitoneRatio = Math.pow(2, 1/12);
    i =  semitoneRatio * i;
    oscillatorOne.frequency.value = i;
};

//Diminuir um semitom no oscilador
botaoDiminuirFreq.onclick = function(){
    var semitoneRatio = Math.pow(2, 1/12);
    i =  i / semitoneRatio;
    oscillatorOne.frequency.value = i;
};

//Ligar Delay
botaoLigarDelay.disabled = true;
botaoLigarDelay.onclick = function(){
    botaoLigarDelay.disabled = true;
    botaoDesligarDelay.disabled = false;
    delayNode = context.createDelayNode();
    delayNode.delayTime.value = 30;
    oscillatorOne.connect(delayNode);
    delayNode.connect(context.destination);
};

//Desligar Delay
botaoDesligarDelay.disabled = true;
botaoDesligarDelay.onclick = function(){
    botaoLigarDelay.disabled = false;
    botaoDesligarDelay.disabled = true;
    oscillatorOne.disconnect(0); 
    delayNode.disconnect(0);
    oscillatorOne.connect(context.destination);
};

//Volume
document.getElementById('volumeOscilador').addEventListener('change', function () {
        oscillatorGainNode.gain.value = this.value;
});


//
//MICROFONE 
//
liveInputGainNode = context.createGainNode();
liveInputGainNode.connect(context.destination);

//Ligar Microfone
botaoLigarLiveInput.onclick = function(){
    botaoDesligarLiveInput.disable = false;
    botaoLigarLiveInput.disable = true;
    function gotStream(stream) {
    liveInput = context.createMediaStreamSource(stream);
    liveInput.connect(liveInputGainNode);
    var recorder = new Recorder(liveInput);
    };
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
navigator.getUserMedia( {audio:true}, gotStream );
};

//Desligar Microfone
botaoDesligarLiveInput.onclick = function(){
    botaoLigarLiveInput.disable = false;
    botaoDesligarLiveInput.disable = true;
    liveInput.disconnect(0);
    delayNode.disconnect(0);
};

botaoIniciarGravacao.onclick = function(){
    recorder.record();
};

botaoPararGravacao.onclick = function(){
    recorder.stop();
    recorder.exportWAV(function(s) {
    audio.src = window.URL.createObjectURL(s);
    });
};

//Volume
document.getElementById('volumeLiveInput').addEventListener('change', function () {
        liveInputGainNode.gain.value = this.value;
});


//ROTEAMENTO
function insertNewNode(sourceNode, previousDestinationNode, newDestinationNode){
    sourceNode.disconnect(0);
    sourceNode.connect(newDestinationNode);
    newDestinationNode.connect(previousDestinationNode);
}