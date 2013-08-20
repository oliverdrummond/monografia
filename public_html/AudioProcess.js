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
var botaoSelecionarTipoOnda = document.getElementById("bTipoOnda");
oscillatorGainNode = context.createGainNode();
oscillatorGainNode.connect(context.destination);

var audio = document.querySelector('audio');

botaoSelecionarTipoOnda.onchange = function(){
    oscillatorOne.type = parseInt(botaoSelecionarTipoOnda.value);
};
//
//OSCILADOR
//

var i = 440;
botaoIniciarGravacao.disabled = true;
botaoPararGravacao.disabled = true;
botaoDesligarLiveInput.disabled = true;
botaoDesligar.disabled = true;

//Ligar o oscilador
botaoLigar.onclick = function(){    
    botaoLigar.disabled = true;
    botaoDesligar.disabled = false;
    botaoLigarDelay.disabled = false;
    botaoSelecionarTipoOnda.disabled = false;
    oscillatorOne = context.createOscillator();
    oscillatorOne.type = oscillatorOne.type = parseInt(botaoSelecionarTipoOnda.value);
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
    delayNode.delayTime.value = 3000;
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
    botaoDesligarLiveInput.disabled = false;
    botaoLigarLiveInput.disabled = true;
    botaoIniciarGravacao.disabled = false;
    function gotStream(stream) {
    liveInput = context.createMediaStreamSource(stream);
    liveInput.connect(liveInputGainNode);
    recorder = new Recorder(liveInput);
    };
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
navigator.getUserMedia( {audio:true}, gotStream );
};

//Desligar Microfone
botaoDesligarLiveInput.onclick = function(){
    botaoDesligarLiveInput.disabled = true;
    botaoLigarLiveInput.disabled = false;
    liveInput.disconnect(0);
};

botaoIniciarGravacao.onclick = function(){
    botaoIniciarGravacao.disabled = true;
    botaoPararGravacao.disabled = false;
    recorder.record();
};

//var worker = new Worker('recorderWorker.js');
//    worker.postMessage({
//      command: 'init',
//      config: {
//        sampleRate: this.context.sampleRate
//      }
//  };
//      
//worker.onmessage = function(e){
//      var blob = e.data;
//      currCallback(blob);
//    }

botaoPararGravacao.onclick = function(){
    botaoIniciarGravacao.disabled = false;
    botaoPararGravacao.disabled = true;
    recorder.stop();
    recorder.exportWAV(function(wav) {
      var url = window.webkitURL.createObjectURL(wav);
      $("audio#recorded-audio").attr("src", url);
      $("audio#recorded-audio").get()[0].load();
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
};