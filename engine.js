var score = [];

function parseChord(chord){
    const notes_sharp = ['C', 'C#', 'D', 'D#', "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const notes_flat = ['C', "Db", 'D', 'Eb', "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

    const re = /^([A-G]([b#])?)(m|M|aug|dim)?([2-7]|9|11|13)?(sus|add)?([2-7]|9|11|13)?(\/)?([A-G][b#])?$/;

    function iter(root, sharpflat, arr){
        let notes = [numToNote(root, sharpflat)];
        arr.forEach(function(interval){
            notes.push(numToNote(root+interval, sharpflat));
        });
        // console.log(notes);
        return notes;
    }

    function numToNote(num, sharpflat){ //follow MIDI note notation: 0 for C-1, 60 for C4
        let octave = (Math.floor(num/12)-1).toString();
        let note;
        if(sharpflat === "#"){
            note = notes_sharp[num%12];
        } else if (sharpflat === "b"){
            note = notes_flat[num%12];
        }
        return note+"/"+octave;
    }

    function noteToNum(note, sharpflat) {
        if(sharpflat === "#") {
            return 60+notes_sharp.indexOf(note);
        } else if (sharpflat === "b"){
            return 60+notes_flat.indexOf(note);
        } else {
            //error
        }
    }

    let myArray = re.exec(chord);
    // console.log(myArray);

    let root = myArray[1];
    let sharpflat = myArray[2];
    let triad = myArray[3];
    let seven = myArray[4];
    let susadd = myArray[5];
    let susaddnum = myArray[6];
    let slash = myArray[7];
    let bass = myArray[8];

    if(sharpflat === undefined)
        sharpflat = "b";

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
        return iter(noteToNum(root, sharpflat), sharpflat, intervals);
    }

    return null;
}

class Unit {
    constructor() {
        this.deleteChord();
    };

    setChord(chord_name){
        this.chord_name = chord_name;
        this.right = [new Note(chord_name, "q", false), new Note(chord_name, "q", false)];
        this.left = [new Note("C/3", "h", false)];
    };

    deleteChord(){
        this.chord_name = null;
        this.right = [new Note(null, "h", true)];
        this.left = [new Note(null, "h", true)];
    }

    invertChord(variation){

    }

    changeRhythm(variation){

    }
}

class Note {
    constructor(keys, duration, is_rest) {
        this.is_rest = is_rest;
        this.duration = duration;
        this.keys = keys;

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

function addUnit(){
    score.push(new Unit());
}

function insertUnit(index) {
    score.splice(index, 0, new Unit());
}

function deleteUnit(index){
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
/*
var unit1 = new Unit('C');
var unit2 = new Unit('F');
var unit3 = new Unit('G');
var unit4 = new Unit('G');


var right1 = [
  new Note(["G/4"], "q", 0),
  new Note(["G/4"], "q", 0),
];

var left1 = [
    new Note(["C/3", "E/3", "G/3"], "h", 0),
];


var right2 = [
  new Note(["A/4"], "q", 0),
  new Note(["A/4"], "q", 0),
];

var left2 = [
    new Note(["C/3", "F/3", "A/3"], "h", 0),
];


var right3 = [
  new Note(["D/4"], "qd", 0),
  new Note(["B/4"], "8", 1),
];

var left3 = [
    new Note(["D/3", "G/3", "B/3"], "qd", 0),
    new Note(["D/3"], "8", 1),
];


var right4 = [
  new Note(["B/4"], "h", 1),
];

var left4 = [
  new Note(["D/3"], "h", 1),
];

unit1.right = right1;
unit2.right = right2;
unit3.right = right3;
unit4.right = right4;

unit1.left = left1;
unit2.left = left2;
unit3.left = left3;
unit4.left = left4;

score.push(unit1);
score.push(unit2);
score.push(unit3);
score.push(unit4);

score.push(unit1);
score.push(unit2);
score.push(unit3);
score.push(unit4);

score.push(unit1);
score.push(unit2);
score.push(unit3);
score.push(unit4);

score.push(unit1);
score.push(unit2);
score.push(unit3);
score.push(unit4);

score.push(unit1);
score.push(unit2);
score.push(unit3);
score.push(unit4);

score.push(unit1);
score.push(unit2);
score.push(unit3);
score.push(unit4);

score.push(unit1);
score.push(unit2);
score.push(unit3);
score.push(unit4);

score.push(unit1);
score.push(unit2);
score.push(unit3);
score.push(unit4);

score.push(unit1);
score.push(unit2);
score.push(unit3);
score.push(unit4);
*/