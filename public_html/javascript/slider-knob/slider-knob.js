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
});

