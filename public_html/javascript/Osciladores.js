var fazerBarulho = function() {
    //CRIAÇÃO DOS NODES
    var osciladores = {
        oscillatorOne : context.createOscillator(),
        oscillatorTwo : context.createOscillator(),
        oscillatorThree : context.createOscillator(),
        oscillatorFour : context.createOscillator()
    };

    //Conectando os osciladores na saída de áudio
    osciladores.oscillatorOne.connect(generatorGainNode);
    osciladores.oscillatorTwo.connect(generatorGainNode);
    osciladores.oscillatorThree.connect(generatorGainNode);
    osciladores.oscillatorFour.connect(generatorGainNode);

    //Ligando os osciladores
    console.log("Ligando Osciladores");
    osciladores.oscillatorOne.start(0);
    osciladores.oscillatorTwo.start(0.1);
    osciladores.oscillatorThree.start(0.2);
    osciladores.oscillatorFour.start(0.3);

    //Desligando os osciladores
    console.log("Desligando Osciladores");
    osciladores.oscillatorOne.stop(4.5);
    osciladores.oscillatorTwo.stop(4.5);
    osciladores.oscillatorThree.stop(4.5);
    osciladores.oscillatorFour.stop(4.5);
    
    return osciladores;
}
