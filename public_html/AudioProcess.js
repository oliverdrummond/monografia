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
//Criação do Nó do Oscilador
oscillatorOne = context.createOscillator();
oscillatorOne.type = 2;
oscillatorTwo = context.createOscillator();
oscillatorTwo.type = 1;

var i = 440;
oscillatorOne.frequency.value = i;
oscillatorTwo.frequency.value = i * 4;

//Criação do Nó de volume
var gainNode = context.createGainNode();
oscillatorOne.connect(gainNode);//Conecta saída do oscilador na entrada do ganho
var filter = context.createBiquadFilter();
oscillatorTwo.connect(filter);
gainNode.connect(filter);//Conecta saída do ganho na "entrada da saída"
gainNode.gain.value = 0.6;
//gainNode.setValueAtTime( 0, now);
//gainNode.gain.linearRampToValueAtTime( 1.0, now + 2.0);
//gainNode.gain.linearRampToValueAtTime( 0.0, now + 4.0);

//Criando nó de filtro
filter.connect(context.destination);
filter.type = 0; // Low-pass filter. See BiquadFilterNode docs
filter.frequency.value = 940; // Set cutoff to 440 HZ

//Começa a executar o som de fato
oscillatorOne.noteOn(0);
oscillatorTwo.noteOn(0);


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