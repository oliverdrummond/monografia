var liveInput = 0;
//VOLUME GERAL DO LIVE INPUT
var liveInputGainNode = context.createGain();

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

//SEPARAR EM OUTRO JAVASCRIPT A PARTE DAS CONEXÕES
//CONEXÕES DOS AUDIO NODES
liveInputGainNode.connect(liveInputGrave);
liveInputGrave.connect(liveInputMedio);
liveInputMedio.connect(liveInputAgudo);
liveInputAgudo.connect(panner);
panner.connect(context.destination);

//Ligar Microfone
botaoLigarLiveInput.onclick = function () {
    botaoDesligarLiveInput.disabled = false;
    botaoLigarLiveInput.disabled = true;
    botaoIniciarGravacao.disabled = false;
    botaoSelecionarEfeitoAudio1.disabled = false;
    function gotStream(stream) {
        liveInput = context.createMediaStreamSource(stream);
        liveInput.connect(liveInputGainNode);
    }   
    navigator.getUserMedia = (navigator.getUserMedia 
            || navigator.webkitGetUserMedia 
            || navigator.mozGetUserMedia 
            || navigator.msGetUserMedia);
    navigator.getUserMedia({audio: true}, gotStream);
};

//Desligar Microfone
botaoDesligarLiveInput.onclick = function () {
    botaoDesligarLiveInput.disabled = true;
    botaoLigarLiveInput.disabled = false;
    liveInput.disconnect(0);
};

//Iniciar Gravação
botaoIniciarGravacao.onclick = function () {
    botaoIniciarGravacao.disabled = true;
    botaoPararGravacao.disabled = false;
    gravador = Gravador();//Tem de ser global mesmo (sem o var)
    gravador.record();
    document.getElementById("dispGravando").style.backgroundColor = "#FF0000";
};

//Parar Gravação
botaoPararGravacao.onclick = function () {
    botaoIniciarGravacao.disabled = false;
    botaoPararGravacao.disabled = true;
    gravador.stop();
    gravador.createDownloadLink();
    document.getElementById("dispGravando").style.backgroundColor = "#FFFFFF";
};

//LFO do Vibrato
var osc = context.createOscillator();
document.getElementById('vibratoFrequency').addEventListener('change', function () {
            osc.frequency.value = this.value;
            dispVibratoFrequency.value = osc.frequency.value + " Hz";
        });

//CONECTAR NOVO EFEITO
botaoSelecionarEfeitoAudio1.onchange = function () {
    hideAllParameters();
    switch (parseInt(botaoSelecionarEfeitoAudio1.value, 10)) {
    case 0://SEM EFEITO
        liveInput.disconnect(0);
        liveInput.connect(liveInputGainNode);
        break;
    case 1://DELAY
        delay = context.createDelay(12.0);
        feedback = context.createGain();
        pluginSlot1 = context.createGainNode();
        
        delay.delayTime.value = 0.5;
        feedback.gain.value = 0.5;
        pluginSlot1.gain.value = 0.5;
        
        liveInput.connect(delay);
        
        document.getElementById('delay').style.display = 'inline';
        document.getElementById('delayTime').addEventListener('change', function () {
            delay.delayTime.value = this.value;
            dispDelayTime.value = delay.delayTime.value.toString().substring(0,5) + " s";
        });
        document.getElementById('delayLevel').addEventListener('change', function () {
            pluginSlot1.gain.value = this.value;
            dispDelayLevel.value = pluginSlot1.gain.value.toString().substring(0,5);
        });
        document.getElementById('delayFeedback').addEventListener('change', function () {
            feedback.gain.value = this.value;
            dispDelayFeedback.value = feedback.gain.value.toString().substring(0,5);
        });
        feedback.connect(delay);
        delay.connect(feedback);
        delay.connect(pluginSlot1);
//        pluginSlot1.connect(liveInputGainNode);//ASSIM DÁ CRASH
        pluginSlot1.connect(context.destination);//ASSIM FUNCIONA
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
//        pluginSlot1 = context.createWaveShaper();
//        pluginSlot1.curve = this.createWSCurve(ND.dist, this.nSamples);
//        pluginSlot1.oversample = "4x";
//        liveInput.disconnect(0);
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
        break;
    case 6://BIT CRUSHER
        document.getElementById('bitCrusher').style.display = 'inline';
        window.BUFFERSIZE = 4096;
        window.BITS = 4;
        window.NORM_FREQUENCY = 0.1;
        pluginSlot1 = createbitCrusher(window.BITS, window.NORM_FREQUENCY);
        
        document.getElementById('bitCrusherBits').addEventListener('change', function () {
            pluginSlot1.disconnect(0);
            liveInput.disconnect(0);
            window.BITS = this.value;
            pluginSlot1 = createbitCrusher(BITS, NORM_FREQUENCY);
            liveInput.connect(pluginSlot1);
            pluginSlot1.connect(liveInputGainNode);
            dispBitCrusherBits.value = pluginSlot1.bits + " bits";
        });
        liveInput.disconnect(0);
        break
    case 7://REVERB
        reverbLevel = context.createGain();
        reverbLevel.gain.value = 0.5;
        document.getElementById('reverb').style.display = 'inline';
        document.getElementById('reverbMix').addEventListener('change', function () {
            reverbLevel.gain.value = this.value;
            dispReverbMix.value = (reverbLevel.gain.value * 100).toString().substring(0,5) + "%";
        });
        pluginSlot1 = context.createConvolver();
        createReverb("cathedral.wav");
        document.getElementById('reverbType').addEventListener('change', function () {
            pluginSlot1.disconnect(0);
            liveInput.disconnect(0);
            createReverb(this.value);
        });
        break
    }
    if (parseInt(botaoSelecionarEfeitoAudio1.value, 10) != 5 && parseInt(botaoSelecionarEfeitoAudio1.value, 10) != 1 && parseInt(botaoSelecionarEfeitoAudio1.value, 10) != 7){
        liveInput.connect(pluginSlot1);
        pluginSlot1.connect(liveInputGainNode);
    }
};


//ANALYZER NODE
botaoFecharAnalizer.onclick = function () {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('bAbrirAnalizer').style.display = 'inline';
    document.getElementById('bFecharAnalizer').style.display = 'none';
    analyser.disconnect(0);
};

var analyser;

botaoAbrirAnalizer.onclick = function () {
    document.getElementById('canvas').style.display = 'inline';
    document.getElementById('bAbrirAnalizer').style.display = 'none';
    document.getElementById('bFecharAnalizer').style.display = 'inline';
    analyser = context.createAnalyser();
    var frequencyDomain;
    analyser.fftSize = 512;
    analyser.minDecibels = -140;
    analyser.maxDecibels = 0;
    analyser.smoothingTimeConstant = 0.8;
    liveInputGainNode.connect(analyser);
    process();
    function process(){
        setInterval(function(){
            frequencyDomain = new Float32Array(analyser.frequencyBinCount);
            analyser.getFloatFrequencyData(frequencyDomain);
        },10);
    }
    var drawInCanvas; 
    var HEIGHT = 600;
    var WIDTH = 600;

    setupCanvas();

    function setupCanvas() { 
        var canvas = document.getElementById('canvas');
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        drawInCanvas = canvas.getContext('2d'); 
        webkitRequestAnimationFrame(update); 
    } 

    var samples = analyser.fftSize;
    var freqs = new Uint8Array(analyser.frequencyBinCount);

    function update() { 
        webkitRequestAnimationFrame(update); 
        if(!setupCanvas) return; 
        drawInCanvas.clearRect(0,0,1800,600); 
        drawInCanvas.fillStyle = 'black'; 
        drawInCanvas.fillRect(0,0,1800,600); 

        var data = new Uint8Array(samples);     
        analyser.getByteFrequencyData(data); 

        for(var i=0; i<data.length; i++) {
            var value = freqs[i];
            var percent = value / 256;
            var height = HEIGHT * percent;
            var offset = HEIGHT - height - 1;
            var barWidth = WIDTH/analyser.frequencyBinCount;
            var hue = i/analyser.frequencyBinCount * 360;
            drawInCanvas.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
            drawInCanvas.fillRect(i*barWidth,100+256-data[i]*2,barWidth,200);
        } 
    } 
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

function createbitCrusher(bits, normfreq) {
    var scriptProcessor = context.createScriptProcessor(window.BUFFERSIZE, 1, 1);
    scriptProcessor.bits = bits ;
    scriptProcessor.normfreq = normfreq;
    var step = Math.pow(1/2, scriptProcessor.bits);
    var phaser = 0;
    var last = 0;

    scriptProcessor.onaudioprocess = function(liveInputGainNode) {
        var input = liveInputGainNode.inputBuffer.getChannelData(0);
        var output = liveInputGainNode.outputBuffer.getChannelData(0);
        for (var i = 0; i < window.BUFFERSIZE; i++) {
            phaser += scriptProcessor.normfreq;
            if (phaser >= 1.0) {
                phaser -= 1.0;
                last = step * Math.floor(input[i] / step + 0.5);
            }
            output[i] = last;
        }
    };
    return scriptProcessor;
};

function createReverb(type) {
    var pluginSlot1 = context.createConvolver();
    var request = new XMLHttpRequest();
    request.open("GET", "impulses/" + type, true);
    request.responseType = "arraybuffer";
    request.onload = function () {
      pluginSlot1.buffer = context.createBuffer(request.response, false);
    };
    request.send();
    liveInput.connect(pluginSlot1);
    pluginSlot1.connect(reverbLevel);
    reverbLevel.connect(liveInputGainNode);
}