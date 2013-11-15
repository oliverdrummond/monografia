$(function() {
    $('#volumeOscilador').knobKnob({
        value: 180,
        turn: function(value) {
            oscillatorGainNode.gain.value = value;
        }
    });

    $('#volumeGerador').knobKnob({
        value: 180,
        turn: function(value) {
            generatorGainNode.gain.value = value;
        }
     });
     
    $('#volumeLiveInput').knobKnob({
        value: 180,
        turn: function(value) {
            liveInputGainNode.gain.value = value;
        }
     });
     
     $('#graveLiveInput').knobKnob({
        value: 0,
        turn: function(value) {
            liveInputGrave.gain.value = value * 100 -50;
        }
     });
     
     $('#medioLiveInput').knobKnob({
        value: 0,
        turn: function(value) {
            liveInputMedio.gain.value = value * 100 -50;
        }
     });
     
     $('#agudoLiveInput').knobKnob({
        value: 0,
        turn: function(value) {
            liveInputAgudo.gain.value = value * 100 -50;
        }
     });
     
     $('#panLiveInput').knobKnob({
        value: 0,
        turn: function(range) {
         range =  range * 100 - 45;
        pan(range);
        dispPanPositionLiveInput.value = range;
            
        }
     });
});

