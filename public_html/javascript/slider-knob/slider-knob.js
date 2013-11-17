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
        value: 180,
        turn: function(value) {
            liveInputGrave.gain.value = value * 100 -50;
        }
     });
     
     $('#medioLiveInput').knobKnob({
        value: 180,
        turn: function(value) {
            liveInputMedio.gain.value = value * 100 -50;
        }
     });
     
     $('#agudoLiveInput').knobKnob({
        value: 180,
        turn: function(value) {
            liveInputAgudo.gain.value = value * 100 -50;
        }
     });
     
     $('#panLiveInput').knobKnob({
        value: 180,
        turn: function(range) {
            range =  range * 100 - 45;
            pan(range);
        }
     });
     
     
     $('#delayTime').knobKnob({
        value: 0,
        turn: function(value) {
            delay.delayTime.value = value * 2;
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
     
     $('#reverbMix').knobKnob({
        value: 0,
        turn: function(value) {
            reverbLevel.gain.value = value * 100;
            dispReverbMix.value = (reverbLevel.gain.value).toString().substring(0,5) + "%";
        }
     });
     
     $('#bitCrusherBits').knobKnob({
        value: 0,
        turn: function(value) {
            pluginSlot1.disconnect(0);
            liveInput.disconnect(0);
            window.BITS = (value * 12) + 4;
            pluginSlot1 = createbitCrusher(BITS, NORM_FREQUENCY);
            liveInput.connect(pluginSlot1);
            pluginSlot1.connect(liveInputGainNode);
            dispBitCrusherBits.value = pluginSlot1.bits.toString().substring(0,5) + " bits";
        }
     });
     
     $('#compressorThreshold').knobKnob({
        value: 0,
        turn: function(value) {
            pluginSlot1.threshold.value = value * -100;
            dispCompressorThreshold.value = pluginSlot1.threshold.value.toString().substring(0,5) + " dB";
        }
     });
     
     $('#compressorKnee').knobKnob({
        value: 0,
        turn: function(value) {
            pluginSlot1.knee.value = value * 40;
            dispCompressorKnee.value = pluginSlot1.knee.value.toString().substring(0,5);
        }
     });
     
     $('#compressorRatio').knobKnob({
        value: 0,
        turn: function(value) {
            pluginSlot1.ratio.value = (value * 19) + 1;
            dispCompressorRatio.value = pluginSlot1.ratio.value.toString().substring(0,5);
        }
     });
     
     
     $('#compressorAttack').knobKnob({
        value: 0,
        turn: function(value) {
            pluginSlot1.attack.value = value;
            dispCompressorAttack.value = pluginSlot1.attack.value.toString().substring(0,5) + " ms";
        }
     });
     
     $('#compressorRelease').knobKnob({
        value: 0,
        turn: function(value) {
            pluginSlot1.release.value = value;
            dispCompressorRelease.value = pluginSlot1.release.value.toString().substring(0,5) + " ms";
        }
     });
     
     
     $('#vibratoFrequency').knobKnob({
        value: 0,
        turn: function(value) {
            osc.frequency.value = value * 20;
            dispVibratoFrequency.value = osc.frequency.value.toString().substring(0,5) + " Hz";
        }
     });
     
     $('#vibratoRange').knobKnob({
        value: 0,
        turn: function(value) {
            pluginSlot1.gain.value = value * 2;
            dispVibratoRange.value = pluginSlot1.gain.value.toString().substring(0,5);
        }
     });
});

