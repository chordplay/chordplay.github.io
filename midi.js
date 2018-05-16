var BPM = 78;
var playing_sources = [];
var playing_notes = [];
var play_timer;
var paused_time;

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
            resumeMIDI();
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
        window.clearInterval(play_timer);
        // console.log("pause with: ", playing_notes);
        paused_time = MIDI.getContext().currentTime;
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
    // console.log("check: ", playing_notes);

    if(playing_notes.length === 0){
        window.clearInterval(play_timer);
        $("#stopButton").hide();
        $("#playButton").show();
    }
}

function resumeMIDI()
{
    let currentTime = MIDI.getContext().currentTime;
    let notes = playing_notes;
    playing_notes = [];
    notes.forEach(function(note){
        let delay = note.start-paused_time+currentTime;
        playNote(note, delay);
    });
    play_timer = window.setInterval(checkPlayingList, 100);
}

function playMIDI (units){
    playing_sources = [];
    playing_notes = [];

    let ldelay = MIDI.getContext().currentTime;
    let rdelay = MIDI.getContext().currentTime;
    units.forEach(function(unit){
        unit.left.forEach(function (note){
            ldelay += playNote(note, ldelay);
        });
        unit.right.forEach(function (note){
            rdelay += playNote(note, rdelay);
        });
    });

    play_timer = window.setInterval(checkPlayingList, 100);
}

function playNote(note, delay){
    let qLength = 60.0/BPM; //length of quarter note (1 beat)
    let type = durationToType(note.duration);
    note.start = delay;
    if(!note.is_rest){
        let pitch = note.keys.map(key => {
            if (key.includes("#")) {
                return MIDI.keyToNote[key.replace("#/", "")] + 1;
            } else {
                return MIDI.keyToNote[key.replace("/", "")];
            }
        });
        let ret = playChord(pitch, delay, qLength * type);

        playing_sources = playing_sources.concat(ret);
    }
    playing_notes.push(note);
    return qLength*type;
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
