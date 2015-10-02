navigator.webkitGetUserMedia({ audio: true, video: true }, function (stream) {
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);

        //canvasContext = $("#canvas")[0].getContext("2d");
        canvasContext = document.getElementById("test");
        canvasContext = canvasContext.getContext("2d");

        var noiseReduction = 0;
        var sampleCount = 0;
        var noiseReductionAverage = 0;

        javascriptNode.onaudioprocess = function () {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            var values = 0;

            var length = array.length;
            for (var i = 0; i < length; i++) {
                values += array[i];
            }

            var average = values / length;
            canvasContext.clearRect(0, 0, 60, 130);
            canvasContext.fillStyle = '#00ff00';

            // initially, sample the averages so we can reduce background noise later on.
            if (sampleCount <= 100) {
                noiseReduction += average;
                sampleCount++;
            }
            // work out the level of the background noise to subtract from the constant incoming sound
            else if (sampleCount > 100 && noiseReductionAverage == 0) {
                noiseReductionAverage = noiseReduction / sampleCount;
            }

            // each time we want the average, reduce it by the background noise level we've calculated
            average -= noiseReductionAverage;

            // if the level ever drops below 0, set it to 0 to stop any funky-ness (not the musical funk)
            if (average < 0) {
                average = 0;
            }
            
            canvasContext.fillRect(0, 130 - average, 25, 130);

        }

    }, function (stream) {

    }
);