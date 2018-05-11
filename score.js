class Unit {
    constructor(chord_name) {
        this.chord = chord_name;
        this.right = [];
        this.left = [];

        this.right.push(new Note(chord_name, "q", false));
        this.right.push(new Note(chord_name, "q", false));
        this.left.push(new Note(chord_name, "h", false));
    }
}

class Note {
    constructor(keys, duration, rest){
        this.rest = rest;
        this.duration = duration;
        this.keys = keys;

        //TODO convert and add keys
    }
}