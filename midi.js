window.onload = function () {
    let BPM = 78;

    MIDI.loadPlugin({
        soundfontUrl: "./midi/examples/soundfont/",
        instrument: "acoustic_grand_piano",
        onprogress: function(state, progress) {
            console.log(state, progress);
        },
        onsuccess: function() {
            console.log("Loaded");
        }
    });

    document.getElementById("playButton").onclick = function(){
        // console.log($('#bpm').val());
        // console.log(typeof($('#bpm').val()));

        // playMIDI(notes, parseInt($('#bpm').val(), 10));
        //playMIDI(notes, BPM, 10);
        $("#stopButton").show();
        $("#playButton").hide();
        if(selected_units.length === 0){
            playMIDI(BPM, score);
        } else {
            // playMIDI(BPM, selected_units); need to be sorted
        }
    };

    $("#stopButton").click(function(){
        if(selected_units.length === 0){
            MIDI.stopAll(playing_sources);
        }
        $("#stopButton").hide();
        $("#playButton").show();
    });
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
    let source = MIDI.chordOn(0, notes, 127, delay);
    MIDI.chordOff(0, notes, delay+length);
    return source;
}

function playMIDI (bpm, units){
    let ldelay = MIDI.getContext().currentTime;
    let rdelay = MIDI.getContext().currentTime;
    let qLength = 60.0/bpm; //length of quarter note (1 beat)

    MIDI.setVolume(0, 127);
    playing_sources = [];
    units.forEach(function(unit){

        function playNotes(note, mode){
            let type = durationToType(note.duration);

            if(note.is_rest){
                if(mode === "right")
                    rdelay += qLength * type;
                else if (mode === "left")
                    ldelay += qLength*type;
            } else {
                let pitch = note.keys.map(key => {if(key.includes("#")) {
                    return MIDI.keyToNote[key.replace("#/", "")] + 1;
                } else {
                    return MIDI.keyToNote[key.replace("/", "")];
                }});

                // playNote(MIDI.keyToNote[pitch], delay, qLength * note.type);
                if(mode === "right"){
                    let ret = playChord(pitch, rdelay, qLength*type);
                    playing_sources = playing_sources.concat(ret);
                    rdelay += qLength * type;
                } else if (mode === "left"){
                    let ret = playChord(pitch, ldelay, qLength*type);
                    playing_sources = playing_sources.concat(ret);
                    ldelay += qLength * type;
                } else {
                    //error
                }
            }
        }

        unit.left.forEach(note => playNotes(note, "left"));
        unit.right.forEach(note => playNotes(note, "right"));
    });
}

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
