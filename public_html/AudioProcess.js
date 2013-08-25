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
var botaoSelecionarEfeitoAudio1 = document.getElementById("bEfeitoAudio1"); 
var botaoSelecionarEfeitoAudio2 = document.getElementById("bEfeitoAudio2"); 
var botaoSelecionarEfeitoAudio3 = document.getElementById("bEfeitoAudio3"); 
var botaoSelecionarEfeitoAudio4 = document.getElementById("bEfeitoAudio4");

//Criação do Volume do Oscilador
oscillatorGainNode = context.createGainNode();
oscillatorGainNode.connect(context.destination);

var audio = document.querySelector('audio');

botaoSelecionarTipoOnda.onchange = function(){
    oscillatorOne.type = parseInt(botaoSelecionarTipoOnda.value);
};
//
//OSCILADOR
//

function log10(value) {
  return Math.log(value) / Math.LN10;
};

function quantosSemitons(){
    var semiTons = (12*((log10(oscillatorOne.frequency.value))/0.3010)) - 105.376;
    semiTons = Math.round(semiTons);
    alert("Semitons " + semiTons);
};

//ESCREVER UM IF QUE PEGUE O RESTO DA DIVISÃO POR 12

var i = 440;
botaoIniciarGravacao.disabled = true;
botaoPararGravacao.disabled = true;
botaoDesligarLiveInput.disabled = true;
botaoDesligar.disabled = true;
botaoSelecionarEfeitoAudio1.disabled = true;
botaoSelecionarEfeitoAudio2.disabled = true;
botaoSelecionarEfeitoAudio3.disabled = true;
botaoSelecionarEfeitoAudio4.disabled = true;

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
    quantosSemitons();
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
//VOLUME GERAL DO LIVE INPUT
document.getElementById('volumeLiveInput').addEventListener('change', function () {
        liveInputGainNode.gain.value = this.value;
});

//GRAVE GERAL DO LIVE INPUT
liveInputGrave = context.createBiquadFilter();
liveInputGrave.type = "lowshelf";
liveInputGrave.frequency.value = 300;
document.getElementById('graveLiveInput').addEventListener('change', function () {
        liveInputGrave.gain.value = this.value;
});

//MÉDIO GERAL DO LIVE INPUT
liveInputMedio = context.createBiquadFilter();
liveInputMedio.type = "peaking";
liveInputMedio.Q = 100;
liveInputMedio.frequency.value = 700;
document.getElementById('medioLiveInput').addEventListener('change', function () {
        liveInputMedio.gain.value = this.value;
});

//AGUDO GERAL DO LIVE INPUT
liveInputAgudo = context.createBiquadFilter();
liveInputAgudo.type = "highshelf";
liveInputAgudo.frequency.value = 3000;
document.getElementById('agudoLiveInput').addEventListener('change', function () {
        liveInputAgudo.gain.value = this.value;
});

//CONEXÕES DOS AUDIO NODES
liveInputGainNode.connect(liveInputGrave);
liveInputGrave.connect(liveInputMedio);
liveInputMedio.connect(liveInputAgudo);
liveInputAgudo.connect(context.destination);

//TESTAR O MÉTODO getFrequencyResponse que teoricamente calcula a resposta de frequência


//Ligar Microfone
botaoLigarLiveInput.onclick = function(){
    botaoDesligarLiveInput.disabled = false;
    botaoLigarLiveInput.disabled = true;
    botaoIniciarGravacao.disabled = false;
    botaoSelecionarEfeitoAudio1.disabled = false;
    botaoSelecionarEfeitoAudio2.disabled = false;
    botaoSelecionarEfeitoAudio3.disabled = false;
    botaoSelecionarEfeitoAudio4.disabled = false;
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

//CONECTAR NOVO EFEITO - SLOT 1
botaoSelecionarEfeitoAudio1.onchange = function(){
    switch(parseInt(botaoSelecionarEfeitoAudio1.value))
    {
    case 0:
        liveInput.disconnect(0);
      if (typeof pluginSlot2 === 'undefined') {
          liveInput.connect(liveInputGainNode);
      } else {
          liveInput.connect(pluginSlot2);
      }
      break;
    case 1:
      pluginSlot1 = context.createDelayNode();
      pluginSlot1.delayTime.value = 3000;
      break;
    case 2:
      pluginSlot1 = context.createDynamicsCompressor();
      pluginSlot1.threshold = -50;
      pluginSlot1.ratio = 12;
      pluginSlot1.attack = 0.003;
      //TODO Não funciona 
      pluginSlot1.reduction.onchange = function(){
        var gainReduction = pluginSlot1.reduction;
        document.getElementById("meter").value = gainReduction.value;
        alert("fdfd");
      };
      //TODO Até aqui
      liveInput.disconnect(0);
      break;
    case 3:
      pluginSlot1 = context.createBiquadFilter();
      pluginSlot1.type = "lowpass";
      pluginSlot1.frequency.value = 2000;
      liveInput.disconnect(0);
      break;
    case 4:
      pluginSlot1 = context.createWaveShaper();
//      pluginSlot1.curve = 1;
//      pluginSlot1.oversample = 12;
      liveInput.disconnect(0);
      break;
     case 5:
         //TODO Não está funcionando, checar com calma o exemplo daqui http://chimera.labs.oreilly.com/books/1234000001552/ch02.html#s02_6
      var DURATION = 2;
      var FREQUENCY = 1;
      var SCALE = 0.4;
      var osc = context.createOscillator();
      osc.frequency.value = FREQUENCY;
      var gain = context.createGain();
      gain.gain.value = SCALE;
      osc.connect(gain);
      gain.connect(liveInputGainNode);
      // Start immediately, and stop in 2 seconds.
      osc.start(0);
      osc.stop(context.currentTime + DURATION);
      liveInput.disconnect(0);
      break; 
     
    }
    liveInput.connect(pluginSlot1);
    pluginSlot1.connect(liveInputGainNode);
};

//CONECTAR NOVO EFEITO - SLOT 2
//TODO Esse ainda está todo errado, terminar primeiro o SLOT 1 para depois fazer o 2
botaoSelecionarEfeitoAudio2.onchange = function(){
//    switch(parseInt(botaoSelecionarEfeitoAudio2.value))
//    {
//    case 0:
//      if (typeof pluginSlot1 === 'undefined') {
//          liveInput.disconnect(0);
//          liveInput.connect(liveInputGainNode);
//      } else {
//          liveInput.disconnect(0);
//          liveInput.connect(pluginSlot2);
//      }
//      break;
//    case 1:
//      pluginSlot2 = context.createDelayNode();
//      pluginSlot2.delayTime.value = 3000;
//      pluginSlot1.disconnect(0);
//      liveInput.connect(pluginSlot2);
//      pluginSlot2.connect(liveInputGainNode);
//      break;
//    case 2:
//      alert("Escolheu a opção 2 - Compressao");
//      break;
//    case 3:
//      alert("Escolheu a opção 3");
//      break;
//    }
};

//ROTEAMENTO
function insertNewNode(sourceNode, previousDestinationNode, newDestinationNode){
    sourceNode.disconnect(0);
    sourceNode.connect(newDestinationNode);
    newDestinationNode.connect(previousDestinationNode);
};