var BPM = 78;
var playing_sources = [];
var playing_notes = [];
var play_timer;

window.onload = function () {

    MIDI.loadPlugin({
        soundfontUrl: "./midi/examples/soundfont/",
        instrument: "acoustic_grand_piano",
        onprogress: function(state, progress) {
            console.log(state, progress);
        },
        onsuccess: function() {
            console.log("Loaded");
            MIDI.setVolume(0, 127);
        }
    });

    $("#playButton").click(function(){
        // console.log($('#bpm').val());
        // console.log(typeof($('#bpm').val()));

        // playMIDI(notes, parseInt($('#bpm').val(), 10));
        $("#stopButton").show();
        $("#playButton").hide();
        if(playing_notes.length > 0){
            ldelay = MIDI.getContext().currentTime;
            rdelay = MIDI.getContext().currentTime;
            let notes = playing_notes;
            playing_notes = [];
            notes.forEach(note => playNote(note));
            play_timer = window.setInterval(checkPlayingList, 100);
            // playMIDI(playing_notes);
        } else {
            if (selected_units.length === 0) {
                playMIDI(score);
            } else {
                // playMIDI(selected_units); need to be sorted
            }
        }
    });

    $("#stopButton").click(function(){
        MIDI.stopAll(playing_sources);
        // playing_notes = [];
        window.clearInterval(play_timer);
        console.log("pause with: ", playing_notes);
        $("#stopButton").hide();
        $("#playButton").show();
    });

    // $("#pauseButton").click(function(){
    //     MIDI.stopAll(playing_sources);
    //     window.clearInterval(play_timer);
    // })
};

/*
note data: rest, pitch, type
pitch: C3, D4...
type: {4.0, 3.0, 2.0, 1.5, 1.0, 0.75, 0.5, 0.375, 0.25} (온음표 -> 16분음표)
*/

// function playNote(note, delay, length){
//     MIDI.noteOn(0, note, 127, delay);
//     MIDI.noteOff(0, note, delay+length);
// }

function playChord(notes, delay, length){
    let source = MIDI.chordOn(0, notes, 127, delay);
    MIDI.chordOff(0, notes, delay+length);
    return source;
}

function checkPlayingList()
{
    let currentTime = MIDI.getContext().currentTime;

    playing_notes = playing_notes.filter(note => note.start>=currentTime);
    console.log("check: ", playing_notes);

    if(playing_notes.length === 0){
        window.clearInterval(play_timer);
        $("#stopButton").hide();
        $("#playButton").show();
    }
}

function playMIDI (units){
    ldelay = MIDI.getContext().currentTime;
    rdelay = MIDI.getContext().currentTime;
    playing_sources = [];
    playing_notes = [];

    console.log(units);
    units.forEach(function(unit){
        unit.left.forEach(note => playNote(note));
        unit.right.forEach(note => playNote(note));
    });

    play_timer = window.setInterval(checkPlayingList, 100);
}

function playNote(note){
    let qLength = 60.0/BPM; //length of quarter note (1 beat)

    let type = durationToType(note.duration);
    if(note.is_rest){
        if(note.hand === "right"){
            note.start = rdelay;
            rdelay += qLength * type;
        }
        else if (note.hand === "left"){
            note.start = ldelay;
            ldelay += qLength*type;
        }
    } else {
        let pitch = note.keys.map(key => {
            if(key.includes("#")) {
                return MIDI.keyToNote[key.replace("#/", "")] + 1;
            } else {
                return MIDI.keyToNote[key.replace("/", "")];
            }
        });
        if(note.hand === "right"){
            let ret = playChord(pitch, rdelay, qLength*type);
            playing_sources = playing_sources.concat(ret);
            note.start = rdelay;
            rdelay += qLength * type;
        } else if (note.hand === "left"){
            let ret = playChord(pitch, ldelay, qLength*type);
            playing_sources = playing_sources.concat(ret);
            note.start = ldelay;
            ldelay += qLength * type;
        } else {
            //error
        }
    }
    playing_notes.push(note);
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
