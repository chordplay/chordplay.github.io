score = [];

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

var unit1 = new Unit('C');
var unit2 = new Unit('F');
var unit3 = new Unit('G');
var unit4 = new Unit('G');

var right1 = [
  new Note(["G/4"], "q", 0),
  new Note(["G/4"], "q", 0),
];
var right2 = [
  new Note(["A/4"], "q", 0),
  new Note(["A/4"], "q", 0),
]
var right3 = [
  new Note(["D/4"], "qd", 0),
  new Note(["B/4"], "8", 1),
]
var right4 = [
  new Note(["B/4"], "h", 1),
]

var left1 = [
  new Note(["C/3", "E/3", "G/3"], "h", 0),
];
var left2 = [
  new Note(["C/3", "F/3", "A/3"], "h", 0),
]
var left3 = [
  new Note(["D/3", "G/3", "B/3"], "qd", 0),
  new Note(["D/3"], "8", 1),
]
var left4 = [
  new Note(["D/3"], "h", 1),
]

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
