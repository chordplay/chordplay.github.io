window.onload = function () {
    let BPM = 120;

    MIDI.loadPlugin({
        soundfontUrl: "./midi/examples/soundfont/",
        instrument: "acoustic_grand_piano",
        onprogress: function(state, progress) {
            console.log(state, progress);
        },
        onsuccess: function() {
            console.log("Loaded");
            document.getElementById("playBtn").disabled = false;
        }
    });

    document.getElementById("playBtn").onclick = function(){
        console.log($('#bpm').val());
        console.log(typeof($('#bpm').val()));

        // playMIDI(notes, parseInt($('#bpm').val(), 10));
        //playMIDI(notes, BPM, 10);
        playMIDI(BPM);
    };
};

/*
note data: rest, pitch, type
pitch: C3, D4...
type: {4.0, 3.0, 2.0, 1.5, 1.0, 0.75, 0.5, 0.375, 0.25} (온음표 -> 16분음표)
*/

function playNote(note, delay, length){
    MIDI.noteOn(0, note, 127, delay);
    MIDI.noteOff(0, note, delay+length);
}

function playChord(notes, delay, length){
    MIDI.chordOn(0, notes, 127, delay);
    MIDI.chordOff(0, notes, delay+length);
}

function playMIDI (bpm){
    let delay = MIDI.getContext().currentTime;
    let qLength = 60.0 / bpm; //length of quarter note (1 beat)
    console.log("qLength: " + qLength);
    MIDI.setVolume(0, 127);
    score.forEach(function(unit){
        unit.left.forEach(function(note){
            function durationToType(duration){
                const durations = ['w', 'h', 'q', '8', '16'];
                let hasdot = false;
                if(duration.includes('d')){
                    hasdot = true;
                    duration = duration.replace("d", "");
                }
                let type = Math.pow(2, 2-durations.indexOf(duration));
                if(hasdot){
                    type *= 1.5;
                }
                return type;
            }

            let type = durationToType(note.duration);

            if(note.is_rest){
                delay += qLength * type;
            } else {
                let pitch = note.keys.map(function(key){
                    return MIDI.keyToNote[key.replace("/", "")];
                    //TODO fix this because MIDI.keyToNote object is not perfect
                });
                console.log("pitch: ", pitch);
                playChord(pitch, delay, qLength*type);
                // playNote(MIDI.keyToNote[pitch], delay, qLength * note.type);
                delay += qLength * type;
            }
        });
    });
}
