$(function() {

    var slider = $('#volumeOscilador'),
            min = slider.attr('min'),
            max = slider.attr('max');

    // Hiding the slider:
    slider.hide();

    $('#control').knobKnob({
        snap: 10,
        value: 250,
        turn: function(ratio) {
            // Changing the value of the hidden slider
            var value = ratio * (max - min) + min;
            slider.attr('value', value);

            aoMecherOscilador(value);
        }
    });

});
