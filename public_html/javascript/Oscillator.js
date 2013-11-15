//Criação do Volume do Gerador de Frequências
var generatorGainNode = context.createGain();
generatorGainNode.connect(context.destination);

//Criação do Volume do Oscilador
var oscillatorGainNode = context.createGain();
oscillatorGainNode.connect(context.destination);

var audio = document.querySelector('audio');

var oscillatorOne;

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
dispPanPositionLiveInput.value = 0;
dispDelayTime.value = 0;


//Ligar o oscilador
botaoLigar.onclick = function () {
    botaoLigar.disabled = true;
    botaoDesligar.disabled = false;
    botaoSelecionarTipoOnda.disabled = false;
    botaoAumentarFreq.disabled = false;
    botaoDiminuirFreq.disabled = false;
    oscillatorGainNode.gain.value = document.getElementById('volumeOscilador').value;
    oscillatorOne = context.createOscillator();
    oscillatorOne.type = parseInt(botaoSelecionarTipoOnda.value, 10);
    oscillatorOne.frequency.value = frequencia;
    oscillatorOne.start(0);
    oscillatorOne.connect(oscillatorGainNode);
};

//Desligar o oscilador
botaoDesligar.onclick = function () {
    botaoLigar.disabled = false;
    botaoDesligar.disabled = true;
    oscillatorGainNode.gain.value = 0;
    oscillatorOne.stop(0);
};

//Aumentar um semitom no oscilador
botaoAumentarFreq.onclick = function () {
    var semitoneRatio = Math.pow(2, 1 / 12);
    frequencia =  semitoneRatio * frequencia;
    oscillatorOne.frequency.value = frequencia;
    dispFrequenciaOscilador.value = frequencia.toString().substring(0,7);
    quantosSemitons();
};

//Diminuir um semitom no oscilador
botaoDiminuirFreq.onclick = function () {
    var semitoneRatio = Math.pow(2, 1 / 12);
    frequencia =  frequencia / semitoneRatio;
    oscillatorOne.frequency.value = frequencia;
    dispFrequenciaOscilador.value = frequencia.toString().substring(0,7);
    quantosSemitons();
};

var aoMecherOscilador = function (value) {
    oscillatorGainNode.gain.value = value;
}

//Volume
//document.getElementById('volumeOscilador').addEventListener('change', aoMecherOscilador);