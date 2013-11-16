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
     
     $('#panLiveInput').knobKnob({//Não está OK ainda
        value: 0,
        turn: function(range) {
         range =  range * 100 - 45;
        pan(range);
        dispPanPositionLiveInput.value = range;
            
        }
     });
     
     
     $('#delayTime').knobKnob({
        value: 0,
        turn: function(value) {
            delay.delayTime.value = value;
            dispDelayTime.value = value.toString().substring(0,5) + " s";
        }
     });
     
     $('#delayLevel').knobKnob({
        value: 0,
        turn: function(value) {
            pluginSlot1.gain.value = value;
            dispDelayLevel.value = value.toString().substring(0,5);
        }
     });
     
     $('#delayFeedback').knobKnob({
        value: 0,
        turn: function(value) {
            feedback.gain.value = value;
            dispDelayFeedback.value = value.toString().substring(0,5);
        }
     });
     
     
     
});

