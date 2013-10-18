var context;
var window;
var reverb;
var contextClass;
var alert;


try {
    var ContextClass = (window.AudioContext //Criação de AudioContext genérico
                || window.webkitAudioContext //Criação de AudioContext para o Chrome
                || window.mozAudioContext //Criação de AudioContext para o Mozilla Firefox
                || window.oAudioContext //Criação de AudioContext para o Opera
                || window.msAudioContext); //Criação de AudioContext para o Internet Explorer
    var context = new ContextClass();
} catch (e) {
    alert('Seu navegador não é compatível com a Web Audio API');
}


var oscilador = context.createOscillator(); //Criação o node de Oscilador
oscilador.type = "sine"; //Escolha da forma de onda a ser sintetizada
oscilador.frequency.value = 440; //Escolha da freqûencia a ser gerada
oscilador.start(0); //Inicio da execução do sintetizador


var equalizadorGrave = context.createBiquadFilter(); //Cria o node de equalizador
equalizadorGrave.type = "highpass"; //Seleciona o tipo de filtro do equalizador
equalizadorGrave.frequency.value = 2000; //Seleciona a frequência do filtro


var compressor = context.createDynamicsCompressor(); //Cria o node de compressor
compressor.threshold.value = -30; //Configura o threshold do compressor em dBs
compressor.attack.value = 0.05; //Configura o ataque do compressor em segundos
compressor.release.value = 0.02; //Configura o release do compressor em segundos


var volume = context.createGain(); //Cria o node de controle de volume
volume.gain.value = 0.5; // Diminui o volume do sinal pela metade


oscilador.connect(equalizadorGrave); //Conecta o oscilador ao equalizador
equalizadorGrave.connect(compressor); //Conecta o equalizador ao compressor
compressor.connect(volume); //Conecta o compressor ao controle de volume
volume.connect(context.destination); //Conecta o volume à saída da placa de som