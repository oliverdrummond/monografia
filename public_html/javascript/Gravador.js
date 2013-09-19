var Gravador = function () {
    var recorder = new Recorder(liveInputAgudo);//SE QUISER COM EFEITOS USA ESSE INPUT, SE QUISER SEM, USA liveinput só
    return {
        record: function () {
            recorder.record();
        },
        stop: function () {
            recorder.stop();
        },
        createDownloadLink: function() {
            recorder.exportWAV(function(blob) {
                var url = URL.createObjectURL(blob);
                var li = document.createElement('li');
                var hf = document.createElement('a');
                //TODO separar isso daqui
                audio.src = url;
                hf.href = url;
                hf.download = 'Arquivo1.wav';
                hf.innerHTML = hf.download;
                li.appendChild(hf);
                $('#linkPlaceholder').append(li);
            });
        }
    };
};