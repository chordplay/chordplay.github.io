var score = [];
var selected_units = [];

function parseChord(chord){
    const notes_sharp = ['C', 'C#', 'D', 'D#', "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const notes_flat = ['C', "Db", 'D', 'Eb', "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

    const re = /^([A-G]([b#])?)(m|M|aug|dim)?([2-7]|9|11|13)?(sus|add)?([2-7]|9|11|13)?(\/)?([A-G][b#])?$/;

    function iter(root, accidental, arr){
        let notes = [numToNote(root, accidental)];
        arr.forEach(function(interval){
            notes.push(numToNote(root+interval, accidental));
        });
        // console.log(notes);
        return notes;
    }

    function numToNote(num, accidental){ //follow MIDI note notation: 0 for C-1, 60 for C4
        let octave = (Math.floor(num/12)).toString();
        let note;
        if(accidental === "#"){
            note = notes_sharp[num%12];
        } else if (accidental === "b"){
            note = notes_flat[num%12];
        }
        return note+"/"+octave;
    }

    function noteToNum(note, accidental) {
        if(accidental === "#") {
            return 48+notes_sharp.indexOf(note);
        } else if (accidental === "b"){
            return 48+notes_flat.indexOf(note);
        } else {
            //error
        }
    }

    let myArray = re.exec(chord);
    // console.log(myArray);

    let root = myArray[1];
    let accidental = myArray[2];
    let triad = myArray[3];
    let seven = myArray[4];
    let susadd = myArray[5];
    let susaddnum = myArray[6];
    let slash = myArray[7];
    let bass = myArray[8];

    if(accidental === undefined)
        accidental = "b";

    let notes = [];
    let intervals = null;

    if(seven === '7'){
        if(triad === undefined){
            intervals = [4, 7, 10];
        } else if (triad === "m"){
            intervals = [3, 7, 10];
        } else if (triad === "M") {
            intervals = [4, 7, 11];
        }
    } else {
        if(susadd === "sus"){
            if(susaddnum === "4"){
                intervals = [5, 7];
            }
        } else if (susadd === "add"){
            //not implemented yet
        } else {
            if (triad === undefined) {
                intervals = [4, 7];
            } else if (triad === "m") {
                intervals = [3, 7];
            } else if (triad === "M") {
                intervals = [5, 7];
            } else if (triad === "aug"){
                intervals = [4, 8];
            } else if (triad === "dim"){
                intervals = [3, 6];
            }
        }
    }

    if(intervals != null){
        return iter(noteToNum(root, accidental), accidental, intervals);
    }

    return null;
}

class Unit {
    constructor() {
        this.deleteChord();
        this.inversion = "0";
        this.rhythm = "0";
    };

    setChord(chord_name){
        this.chord_name = chord_name;
        let notes = parseChord(chord_name);
        var temp = notes[0].split("/");

        var basenode1 = temp[0]+"/"+(temp[1]-1);
        var basenode2 = temp[0]+"/"+(temp[1]-2);

        this.left = [new Note([basenode2, basenode1], "h", false, "left")];
        this.right = [new Note(notes, "q", false, "right"), new Note(notes, "q", false, "right")];
    };

    deleteChord(){
        this.chord_name = "rest";
        this.right = [new Note(["B/4"], "h", true, "right")];
        this.left = [new Note(["D/3"], "h", true, "left")];
    }

    invertChord(variation){
      let notes = parseChord(this.chord_name);
      var temp = notes[0].split("/");
      var basenode1 = temp[0]+"/"+(temp[1]-1);
      var basenode2 = temp[0]+"/"+(temp[1]-2);

      if(variation == 0){
        this.setChord(this.chord_name);
        this.inversion = "0";
      }
      else if(variation == 1){
        var octave = temp[1]*1+1;
        var upnode = temp[0]+"/"+octave;

        notes.push(upnode);
        notes.splice(0, 1);
        console.log(notes);
        this.inversion = "1";
      }
      else{ // variation == 2, need to be fixed later for 7 chord
        var temp2 = notes[notes.length-1].split("/")
        var octave = temp2[1]*1-1;
        var downnode = temp2[0]+"/"+octave;
        notes.splice(notes.length-1, 1);
        notes.unshift(downnode);

        this.inversion = "2";
      }

      if(this.rhythm == 0){
        //console.log(this.chord_name);
        this.left = [new Note([basenode2, basenode1], "h", false, "left")];
        this.right = [new Note(notes, "q", false, "right"), new Note(notes, "q", false, "right")];
      }
      else if(this.rhythm == 1){
        this.left = [new Note([basenode2, basenode1], "h", false, "left")];
        this.right = [new Note(notes, "8", false, "right"), new Note([notes[0]], "8", false, "right"), new Note([notes[1]], "8", false, "right"), new Note([notes[2]], "8", false, "right")];
        this.inversion = "1";
      }
      else{
        this.left = [new Note([basenode2, basenode1], "h", false, "left")];
        this.right = [new Note(notes, "q", false, "right"), new Note(notes, "8", false, "right"), new Note([notes[1]], "16", false, "right"), new Note([notes[0]], "16", false, "right")];
        this.inversion = "2"
      }
    }

    changeRhythm(variation){
      let notes = parseChord(this.chord_name);
      var temp = notes[0].split("/");
      var basenode1 = temp[0]+"/"+(temp[1]-1);
      var basenode2 = temp[0]+"/"+(temp[1]-2);
      if(this.inversion == 1){

        var octave = temp[1]*1+1;
        var upnode = temp[0]+"/"+octave;

        notes.push(upnode);
        notes.splice(0, 1);
        console.log(notes);
      }
      else if(this.inversion == 2){

        var temp2 = notes[notes.length-1].split("/")
        var octave = temp2[1]*1-1;
        var downnode = temp2[0]+"/"+octave;
        notes.splice(notes.length-1, 1);
        notes.unshift(downnode);
        console.log(notes);
      }
      else {
        console.log(notes);
      }

      if(variation == 0){
        console.log(this.chord_name);
        this.left = [new Note([basenode2, basenode1], "h", false, "left")];
        this.right = [new Note(notes, "q", false, "right"), new Note(notes, "q", false, "right")];
        this.rhythm = "0";
      }
      else if(variation == 1){
        this.left = [new Note([basenode2, basenode1], "h", false, "left")];
        this.right = [new Note(notes, "8", false, "right"), new Note([notes[0]], "8", false, "right"), new Note([notes[1]], "8", false, "right"), new Note([notes[2]], "8", false, "right")];
        this.rhythm = "1";
      }
      else{
        this.left = [new Note([basenode2, basenode1], "h", false, "left")];
        this.right = [new Note(notes, "q", false, "right"), new Note(notes, "8", false, "right"), new Note([notes[1]], "16", false, "right"), new Note([notes[0]], "16", false, "right")];
        this.rhythm = "2";
      }
    }
}

class Note {
    //duration: w, h, q, 8, 16 + d
    constructor(keys, duration, is_rest, hand) {
        this.keys = keys;
        this.duration = duration;
        this.is_rest = is_rest;
        this.hand = hand
        //TODO add method to convert and add keys
    }

    changeDuration(duration){
        this.duration = duration;
    }

    setToNotes(){
        this.is_rest = false;
    }

    setToRests(){
        this.is_rest = true;
        this.keys = null;
    }

    changeKeys(variation) {
        this.keys = variation;
    }
}

function addUnit(){ //add a new empty unit to the last of score
    score.push(new Unit());
}

function insertUnit(index) { //insert a new empty unit to score with index
    score.splice(index, 0, new Unit());
}

function deleteUnit(index){ //delete a unit with index
    score.splice(index, 1);
}

function setChord(index, chord_name){
    score[index].setChord(chord_name);
}

function invertChord(index, variation){
    score[index].invertChord(variation);
}

function changeRhythm(index, variation){
    score[index].changeRhythm(variation);
}

function deleteChord(index){
    score[index].deleteChord();
}
