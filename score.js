score = [];

class Unit {
    constructor() {
        deleteChord();
    };

    setChord(chord_name){
        this.chord_name = chord_name;
        this.right = [new Note(chord_name, "q", false), new Note(chord_name, "q", false)];
        this.left = [new Note(chord_name, "h", false)];
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