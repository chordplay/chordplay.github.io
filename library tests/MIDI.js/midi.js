window.onload = function () {

  var BPM = 60;

  var notes = [];
  notes.push({rest:0, pitch:"A3", type:0.75});
  notes.push({rest:0, pitch:"G3", type:0.25});
  notes.push({rest:0, pitch:"F3", type:0.5});
  notes.push({rest:0, pitch:"G3", type:0.5});

  notes.push({rest:0, pitch:"A3", type:0.5});
  notes.push({rest:0, pitch:"A3", type:0.5});
  notes.push({rest:0, pitch:"A3", type:1.0});

  notes.push({rest:0, pitch:"G3", type:0.5});
  notes.push({rest:0, pitch:"G3", type:0.5});
  notes.push({rest:0, pitch:"G3", type:1.0});

  notes.push({rest:0, pitch:"A3", type:0.5});
  notes.push({rest:0, pitch:"A3", type:0.5});
  notes.push({rest:0, pitch:"A3", type:1.0});

  notes.push({rest:0, pitch:"A3", type:0.75});
  notes.push({rest:0, pitch:"G3", type:0.25});
  notes.push({rest:0, pitch:"F3", type:0.5});
  notes.push({rest:0, pitch:"G3", type:0.5});

  notes.push({rest:0, pitch:"A3", type:0.5});
  notes.push({rest:0, pitch:"A3", type:0.5});
  notes.push({rest:0, pitch:"A3", type:1.0});

  notes.push({rest:0, pitch:"G3", type:0.5});
  notes.push({rest:0, pitch:"G3", type:0.5});
  notes.push({rest:0, pitch:"A3", type:0.75});
  notes.push({rest:0, pitch:"G3", type:0.25});

  notes.push({rest:0, pitch:"F3", type:2.0});

  console.log(notes);

	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
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
    playMIDI(notes, parseInt($('#bpm').val(), 10));
	};
}

/*
note data: rest, pitch, type
pitch: C3, D4...
type: {4.0, 3.0, 2.0, 1.5, 1.0, 0.75, 0.5, 0.375, 0.25} (온음표 -> 16분음표)
*/
var playNote = function(note, delay, length){
  MIDI.noteOn(0, note, 127, delay);
  MIDI.noteOff(0, note, delay+length);
};

var playMIDI = function(notes, bpm){
  var delay = MIDI.getContext().currentTime;
  var qLength = 60.0 / bpm;
  console.log("qLength: " + qLength);
  MIDI.setVolume(0, 127);
  notes.forEach(function(note){
    if(note.rest == 1){
      delay += qLength * note.type;
    }
    else{
      playNote(MIDI.keyToNote[note.pitch], delay, qLength * note.type);
      delay += qLength * note.type;
    }
  })
}
