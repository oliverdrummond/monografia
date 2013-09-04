//"use strict";
/*global window, alert, document*/
try {
    var contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
    var context = new contextClass();
} catch (e) {
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
var botaoDesligarLiveInput = document.getElementById("bDesligarLiveInput");
var botaoIniciarGravacao = document.getElementById("bIniciarGravacao");
var botaoPararGravacao = document.getElementById("bPararGravacao");
var botaoSelecionarTipoOnda = document.getElementById("bTipoOnda");
var botaoSelecionarEfeitoAudio1 = document.getElementById("bEfeitoAudio1");
var botaoSelecionarEfeitoAudio2 = document.getElementById("bEfeitoAudio2");
var botaoSelecionarEfeitoAudio3 = document.getElementById("bEfeitoAudio3");
var botaoSelecionarEfeitoAudio4 = document.getElementById("bEfeitoAudio4");
var campoNotaOscilador = document.getElementById("dispNotaOscilador");
var dispFrequenciaOscilador = document.getElementById("dispFrequenciaOscilador");
var dispPanPositionLiveInput = document.getElementById("dispPanPositionLiveInput");

//Criação do Volume do Oscilador
var oscillatorGainNode = context.createGain();
oscillatorGainNode.connect(context.destination);

var audio = document.querySelector('audio');

botaoSelecionarTipoOnda.onchange = function () {
    oscillatorOne.type = parseInt(botaoSelecionarTipoOnda.value, 10);
};
//
//OSCILADOR
//

var frequencia = 440;
dispFrequenciaOscilador.value = frequencia;
botaoSelecionarTipoOnda.disabled = true;
botaoAumentarFreq.disabled = true;
botaoDiminuirFreq.disabled = true;
botaoIniciarGravacao.disabled = true;
botaoPararGravacao.disabled = true;
botaoDesligarLiveInput.disabled = true;
botaoDesligar.disabled = true;
botaoSelecionarEfeitoAudio1.disabled = true;
botaoSelecionarEfeitoAudio2.disabled = true;
botaoSelecionarEfeitoAudio3.disabled = true;
botaoSelecionarEfeitoAudio4.disabled = true;
dispPanPositionLiveInput.value = 0;


//Ligar o oscilador
var oscillatorOne;
botaoLigar.onclick = function () {
    botaoLigar.disabled = true;
    botaoDesligar.disabled = false;
    botaoLigarDelay.disabled = false;
    botaoSelecionarTipoOnda.disabled = false;
    botaoAumentarFreq.disabled = false;
    botaoDiminuirFreq.disabled = false;
    oscillatorOne = context.createOscillator();
    oscillatorOne.type = parseInt(botaoSelecionarTipoOnda.value, 10);
    oscillatorOne.frequency.value = frequencia;
    oscillatorOne.noteOn(0);
    oscillatorOne.connect(oscillatorGainNode);
};

//Desligar o oscilador
botaoDesligar.onclick = function () {
    botaoLigar.disabled = false;
    botaoDesligar.disabled = true;
    botaoLigarDelay.disabled = true;
    botaoDesligarDelay.disabled = true;
    oscillatorOne.noteOff(0);  
};

//Aumentar um semitom no oscilador
botaoAumentarFreq.onclick = function () {
    var semitoneRatio = Math.pow(2, 1 / 12);
    frequencia =  semitoneRatio * frequencia;
    oscillatorOne.frequency.value = frequencia;
    dispFrequenciaOscilador.value = frequencia;
    quantosSemitons();
};

//Diminuir um semitom no oscilador
botaoDiminuirFreq.onclick = function () {
    var semitoneRatio = Math.pow(2, 1 / 12);
    frequencia =  frequencia / semitoneRatio;
    oscillatorOne.frequency.value = frequencia;
    dispFrequenciaOscilador.value = frequencia;
    quantosSemitons();
};

//Ligar Delay
botaoLigarDelay.disabled = true;
botaoLigarDelay.onclick = function () {
    botaoLigarDelay.disabled = true;
    botaoDesligarDelay.disabled = false;
    delayNode = context.createDelayNode();
    delayNode.delayTime.value = 3000;
    oscillatorOne.connect(delayNode);
    delayNode.connect(context.destination);
};

//Desligar Delay
botaoDesligarDelay.disabled = true;
botaoDesligarDelay.onclick = function () {
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
var liveInputGainNode = context.createGain();
//VOLUME GERAL DO LIVE INPUT
document.getElementById('volumeLiveInput').addEventListener('change', function () {
    liveInputGainNode.gain.value = this.value;
});

//GRAVE GERAL DO LIVE INPUT
var liveInputGrave = context.createBiquadFilter();
liveInputGrave.type = "lowshelf";
liveInputGrave.frequency.value = 300;
document.getElementById('graveLiveInput').addEventListener('change', function () {
    liveInputGrave.gain.value = this.value;
});

//MÉDIO GERAL DO LIVE INPUT
var liveInputMedio = context.createBiquadFilter();
liveInputMedio.type = "peaking";
liveInputMedio.Q = 100;
liveInputMedio.frequency.value = 700;
document.getElementById('medioLiveInput').addEventListener('change', function () {
    liveInputMedio.gain.value = this.value;
});

//AGUDO GERAL DO LIVE INPUT
var liveInputAgudo = context.createBiquadFilter();
liveInputAgudo.type = "highshelf";
liveInputAgudo.frequency.value = 3000;
document.getElementById('agudoLiveInput').addEventListener('change', function () {
    liveInputAgudo.gain.value = this.value;
});

//PANNER DO LIVE INPUT
var liveInputPannerNode = context.createPanner();
document.getElementById('panLiveInput').addEventListener('change', function () {
    liveInputPannerNode.setPosition(this.value, 0, 0);
    dispPanPositionLiveInput.value = this.value;
//    context.listener.setPosition(this.value, 0, 0);
});

//ANALYZER NODE
//DEIXEI TUDO NO VISUALIZER SAMPLE.JS

//CONEXÕES DOS AUDIO NODES
liveInputGainNode.connect(liveInputGrave);
liveInputGrave.connect(liveInputMedio);
liveInputMedio.connect(liveInputAgudo);
liveInputAgudo.connect(liveInputPannerNode);
liveInputPannerNode.connect(context.destination);

//TESTAR O MÉTODO getFrequencyResponse que teoricamente calcula a resposta de frequência

//Ligar Microfone
botaoLigarLiveInput.onclick = function () {
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
    }
    
    navigator.getUserMedia = navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia;
    navigator.getUserMedia({audio: true}, gotStream);
};

//Desligar Microfone
botaoDesligarLiveInput.onclick = function () {
    botaoDesligarLiveInput.disabled = true;
    botaoLigarLiveInput.disabled = false;
    liveInput.disconnect(0);
};

botaoIniciarGravacao.onclick = function () {
    botaoIniciarGravacao.disabled = true;
    botaoPararGravacao.disabled = false;
    gravador = Gravador();//Tem de ser global mesmo (sem o var)
    gravador.record();
    document.getElementById("dispGravando").style.backgroundColor = "#FF0000";
//    document.body.style.backgroundColor = "#FF0000";
};

botaoPararGravacao.onclick = function () {
    botaoIniciarGravacao.disabled = false;
    botaoPararGravacao.disabled = true;
    gravador.stop();
    gravador.createDownloadLink();
    document.getElementById("dispGravando").style.backgroundColor = "#FFFFFF";
//    document.body.style.backgroundColor = "#FFFFFF";
};

//CONECTAR NOVO EFEITO - SLOT 1
botaoSelecionarEfeitoAudio1.onchange = function () {
    switch (parseInt(botaoSelecionarEfeitoAudio1.value, 10)) {
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
        pluginSlot1.threshold.value = -20;
        pluginSlot1.ratio.value = 12;
        pluginSlot1.attack.value = 0.003;
        //TODO Não funciona 
        pluginSlot1.reduction.onchange = function () {
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
        pluginSlot1.curve = this.createWSCurve(ND.dist, this.nSamples);;
        pluginSlot1.oversample = "4x";
        liveInput.disconnect(0);
        break;
    case 5:
        //TODO Não está funcionando, checar com calma o exemplo daqui http://chimera.labs.oreilly.com/books/1234000001552/ch02.html#s02_6
        var DURATION = 2, FREQUENCY = 1, SCALE = 0.4;
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
botaoSelecionarEfeitoAudio2.onchange = function () {
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

//ROTEAMENTO - NÃO SEI SE AINDA VOU USAR
function insertNewNode(sourceNode, previousDestinationNode, newDestinationNode){
    sourceNode.disconnect(0);
    sourceNode.connect(newDestinationNode);
    newDestinationNode.connect(previousDestinationNode);
}

function quantosSemitons() {
    var NOTES = {0: "A", 1: "A#", 2: "B", 3: "C", 4: "C#", 5: "D", 6: "D#", 7: "E", 8: "F", 9: "F#", 10: "G", 11: "G#"},
    semitons = (12 * ((log10(oscillatorOne.frequency.value)) / 0.3010)) - 105.376;
    semitons = Math.round(semitons);
    if (semitons > 12) {
        semitons = semitons % 12;
    } else if (semitons < 0) {
        semitons = 12 + semitons;
    }
    for (var i = 0; i<= 11 ; i++) {
        if (i === semitons) {
            campoNotaOscilador.value = NOTES[i];
            break;
        } 
    }
}

function log10(value) {
    return Math.log(value) / Math.LN10;
}

function createCurve(amount, n_samples) {
    if ((amount >= 0) && (amount < 1)) {
        ND.dist = amount;
        var k = 2 * ND.dist / (1 - ND.dist);
        for (var i = 0; i < n_samples; i+=1) {
            // LINEAR INTERPOLATION: x := (c - a) * (z - y) / (b - a) + y
            // a = 0, b = 2048, z = 1, y = -1, c = i
            var x = (i - 0) * (1 - (-1)) / (n_samples - 0) + (-1);
            this.wsCurve[i] = (1 + k) * x / (1+ k * Math.abs(x));
        }
    }
}