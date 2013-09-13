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
var botaoTocarSemSustain = document.getElementById("bTocarSemSustain");
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

//CRIAÇÃO DOS DISPLAYS
var campoNotaOscilador = document.getElementById("dispNotaOscilador");
var dispFrequenciaOscilador = document.getElementById("dispFrequenciaOscilador");
var dispPanPositionLiveInput = document.getElementById("dispPanPositionLiveInput");
var dispDelayTime = document.getElementById("dispDelayTime");
var dispVibratoFrequency = document.getElementById("dispVibratoFrequency");
var dispVibratoRange = document.getElementById("dispVibratoRange");
var dispCompressorThreshold = document.getElementById('dispcompressorThreshold');
var dispCompressorKnee = document.getElementById('dispcompressorKnee');
var dispCompressorRatio = document.getElementById('dispcompressorRatio');
var dispCompressorAttack = document.getElementById('dispcompressorAttack');
var dispCompressorRelease = document.getElementById('dispcompressorRelease');

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
dispDelayTime.value = 0;


//Ligar o oscilador
var oscillatorOne;
botaoLigar.onclick = function () {
    botaoLigar.disabled = true;
    botaoTocarSemSustain.disabled = true;
    botaoDesligar.disabled = false;
    botaoLigarDelay.disabled = false;
    botaoSelecionarTipoOnda.disabled = false;
    botaoAumentarFreq.disabled = false;
    botaoDiminuirFreq.disabled = false;
    oscillatorOne = context.createOscillator();
    oscillatorOne.type = parseInt(botaoSelecionarTipoOnda.value, 10);
    oscillatorOne.frequency.value = frequencia;
    oscillatorOne.start(0);
    oscillatorOne.connect(oscillatorGainNode);
};

//Desligar o oscilador
botaoDesligar.onclick = function () {
    botaoLigar.disabled = false;
    botaoTocarSemSustain.disabled = false;
    botaoDesligar.disabled = true;
    botaoLigarDelay.disabled = true;
    botaoDesligarDelay.disabled = true;
//    oscillatorGainNode.gain.value.linearRampToValueAtTime(0, context.currentTime + 0.5);
    oscillatorGainNode.gain.value = 0;
    oscillatorOne.stop(0);
};

botaoTocarSemSustain.onmousedown = function () {
    oscillatorOne = context.createOscillator();
    oscillatorOne.type = parseInt(botaoSelecionarTipoOnda.value, 10);
    oscillatorOne.frequency.value = frequencia;
    oscillatorOne.start(0);
    oscillatorOne.connect(oscillatorGainNode);
}

botaoTocarSemSustain.onmouseup = function () {
    oscillatorOne.stop(0);
}



//Aumentar um semitom no oscilador
botaoAumentarFreq.onclick = function () {
    var semitoneRatio = Math.pow(2, 1 / 12);
    frequencia =  semitoneRatio * frequencia;
//    oscillatorOne.frequency.value = frequencia;
    oscillatorOne.frequency.linearRampToValueAtTime(frequencia, context.currentTime + 1);
    dispFrequenciaOscilador.value = frequencia.toString().substring(0,7);
    quantosSemitons();
};

//Diminuir um semitom no oscilador
botaoDiminuirFreq.onclick = function () {
    var semitoneRatio = Math.pow(2, 1 / 12);
    frequencia =  frequencia / semitoneRatio;
//    oscillatorOne.frequency.value = frequencia;
    oscillatorOne.frequency.linearRampToValueAtTime(frequencia, context.currentTime + 1);
    dispFrequenciaOscilador.value = frequencia.toString().substring(0,7);
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

var liveInput = 0;
//VOLUME GERAL DO LIVE INPUT
var liveInputGainNode = context.createGain();
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
var panner = context.createPanner();
document.getElementById('panLiveInput').addEventListener('change', function () {
  var range = this.value;
  pan(range);
  dispPanPositionLiveInput.value = range;
});


//ANALYZER NODE
//DEIXEI TUDO NO VISUALIZER SAMPLE.JS

//CONEXÕES DOS AUDIO NODES
liveInputGainNode.connect(liveInputGrave);
liveInputGrave.connect(liveInputMedio);
liveInputMedio.connect(liveInputAgudo);
liveInputAgudo.connect(panner);
panner.connect(context.destination);

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
};

botaoPararGravacao.onclick = function () {
    botaoIniciarGravacao.disabled = false;
    botaoPararGravacao.disabled = true;
    gravador.stop();
    gravador.createDownloadLink();
    document.getElementById("dispGravando").style.backgroundColor = "#FFFFFF";
};

var osc = context.createOscillator();
document.getElementById('vibratoFrequency').addEventListener('change', function () {
            osc.frequency.value = this.value;
            dispVibratoFrequency.value = osc.frequency.value + " Hz";
        });

//CONECTAR NOVO EFEITO - SLOT 1
botaoSelecionarEfeitoAudio1.onchange = function () {
    hideAllParameters();
    switch (parseInt(botaoSelecionarEfeitoAudio1.value, 10)) {
    case 0://SEM EFEITO
        liveInput.disconnect(0);
        if (typeof pluginSlot2 === 'undefined') {
            liveInput.connect(liveInputGainNode);
        } else {
            liveInput.connect(pluginSlot2);
        }
        break;
    case 1://DELAY
        pluginSlot1 = context.createDelay(12.0);
        document.getElementById('delay').style.display = 'inline';
        document.getElementById('delayTime').addEventListener('change', function () {
            pluginSlot1.delayTime.value = this.value;
            dispDelayTime.value = pluginSlot1.delayTime.value.toString().substring(0,5) + " s";
        });
        feedback = context.createGain();
        feedback.gain.value = 0.5;
//        document.getElementById('delayFeedback').addEventListener('change', function () {
//            pluginSlot1.delayTime.value = this.value;
//        });
        pluginSlot1.connect(feedback);
        feedback.connect(pluginSlot1);
        //TESTES
//        FeedbackDelayNode(context, 2, 0.5);
//        
//        function FeedbackDelayNode(context, delay, feedback){
//            this.delayTime.value = delay;
//            this.gainNode = context.createGainNode();
//            this.gainNode.gain.value = feedback;
//            this.connect(this.gainNode);
//            this.gainNode.connect(this);
//        }
//
//        function FeedbackDelayFactory(context, delayTime, feedback){
//            var delay = context.createDelayNode(delayTime + 1);
//            FeedbackDelayNode.call(delay, context, delayTime, feedback);
//            return delay;
//        }
//
//        AudioContext.prototype.createFeedbackDelay = function(delay, feedback){
//            return FeedbackDelayFactory(this, delay, feedback);
//        };
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        //ATÉ AQUI
        break;
    case 2://COMPRESSOR
        document.getElementById('compressor').style.display = 'inline';
        pluginSlot1 = context.createDynamicsCompressor();
        document.getElementById('compressorThreshold').addEventListener('change', function () {
            pluginSlot1.threshold.value = this.value;
            dispCompressorThreshold.value = pluginSlot1.threshold.value.toString().substring(0,5) + " dB";
        });
        document.getElementById('compressorKnee').addEventListener('change', function () {
            pluginSlot1.knee.value = this.value;
            dispCompressorKnee.value = pluginSlot1.knee.value;
        });
        document.getElementById('compressorRatio').addEventListener('change', function () {
            pluginSlot1.ratio.value = this.value;
            dispCompressorRatio.value = pluginSlot1.ratio.value;
        });
        document.getElementById('compressorAttack').addEventListener('change', function () {
            pluginSlot1.attack.value = this.value;
            dispCompressorAttack.value = pluginSlot1.attack.value.toString().substring(0,5) + " ms";
        });
        document.getElementById('compressorRelease').addEventListener('change', function () {
            pluginSlot1.release.value = this.value;
            dispCompressorRelease.value = pluginSlot1.release.value.toString().substring(0,5) + " ms";
        });
        var bar = document.querySelector('.bar');
        draw();
        function draw() {
            var reduction = pluginSlot1.reduction.value;
            var scaled = scale(reduction, -192, 0, 0, 100);
            if (( -1 * reduction ) < 10){
                bar.style.background =  "green";
            } else if (( -1 * reduction ) >= 10 && ( -1 * reduction ) < 20){
                bar.style.background =  "yellow";
            } else {
                bar.style.background =  "red";
            }
            bar.style.width = ( -1 * reduction ) + '%';
            webkitRequestAnimationFrame(draw);
        }

        function scale( val, f0, f1, t0, t1 ) {
            return (val - f0) * (t1 - t0) / (f1 - f0) + t0;
        }
        liveInput.disconnect(0);
        break;
    case 3://TELEFONE
        pluginSlot1 = context.createBiquadFilter();
        pluginSlot1.type = "lowpass";
        pluginSlot1.frequency.value = 2000;
        liveInput.disconnect(0);
        break;
    case 4://DISTORÇÃO
        pluginSlot1 = context.createWaveShaper();
        pluginSlot1.curve = this.createWSCurve(ND.dist, this.nSamples);
        pluginSlot1.oversample = "4x";
        liveInput.disconnect(0);
        break;
    case 5://VIBRATO
        document.getElementById('vibrato').style.display = 'inline';
        document.getElementById('vibratoRange').addEventListener('change', function () {
            pluginSlot1.gain.value = this.value;
            dispVibratoRange.value = pluginSlot1.gain.value;
        });
        var FREQUENCY = 5;
        var SCALE = 0.8;
        osc.frequency.value = FREQUENCY;
        var pluginSlot1 = context.createGain();
        pluginSlot1.gain.value = SCALE;
        osc.connect(pluginSlot1);
        pluginSlot1.connect(liveInputGainNode.gain);
        osc.start(0);
    }
    if (parseInt(botaoSelecionarEfeitoAudio1.value, 10) != 5){
        liveInput.connect(pluginSlot1);
        pluginSlot1.connect(liveInputGainNode);
    }
};

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

function pan(range) {
  var xDeg = parseInt(range,10);
  var zDeg = xDeg + 90;
  if (zDeg > 90) {
    zDeg = 180 - zDeg;
  }
  var x = Math.sin(xDeg * (Math.PI / 180));
  var z = Math.sin(zDeg * (Math.PI / 180));
  panner.setPosition(x, 0, z);
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

function hideAllParameters () {
    document.getElementById('compressor').style.display = 'none';
    document.getElementById('delay').style.display = 'none';
    document.getElementById('vibrato').style.display = 'none';
}