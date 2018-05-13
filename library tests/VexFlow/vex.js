$( document ).ready(function() {
VF = Vex.Flow;


var renderer1 = new VF.Renderer($("#bar1").get(0), VF.Renderer.Backends.SVG);
var renderer2 = new VF.Renderer($("#bar2").get(0), VF.Renderer.Backends.SVG);
var renderer3 = new VF.Renderer($("#bar3").get(0), VF.Renderer.Backends.SVG);
var renderer4 = new VF.Renderer($("#bar4").get(0), VF.Renderer.Backends.SVG);
var renderer5 = new VF.Renderer($("#bar5").get(0), VF.Renderer.Backends.SVG);
var renderer6 = new VF.Renderer($("#bar6").get(0), VF.Renderer.Backends.SVG);
var renderer7 = new VF.Renderer($("#bar7").get(0), VF.Renderer.Backends.SVG);
var renderer8 = new VF.Renderer($("#bar8").get(0), VF.Renderer.Backends.SVG);


renderer1.resize(500,200);
renderer2.resize(500,200);
renderer3.resize(500,200);
renderer4.resize(500,200);
renderer5.resize(500,200);
renderer6.resize(500,200);
renderer7.resize(500,200);
renderer8.resize(500,200);

var context1 = renderer1.getContext();
var context2 = renderer2.getContext();
var context3 = renderer3.getContext();
var context4 = renderer4.getContext();
var context5 = renderer5.getContext();
var context6 = renderer6.getContext();
var context7 = renderer7.getContext();
var context8 = renderer8.getContext();

var stave1 = new VF.Stave(0,40,400);
var stave2 = new VF.Stave(0,40,400);
var stave3 = new VF.Stave(0,40,400);
var stave4 = new VF.Stave(0,40,400);
var stave5 = new VF.Stave(0,40,400);
var stave6 = new VF.Stave(0,40,400);
var stave7 = new VF.Stave(0,40,400);
var stave8 = new VF.Stave(0,40,400);

stave1.addClef("treble").addTimeSignature("2/4").addKeySignature('F');
stave5.addClef("treble").addTimeSignature("2/4").addKeySignature('F');
stave8.setEndBarType(Vex.Flow.Barline.type.END);
stave1.setContext(context1).draw();

stave2.setContext(context2).draw();
stave3.setContext(context3).draw();
stave4.setContext(context4).draw();
stave5.setContext(context5).draw();
stave6.setContext(context6).draw();
stave7.setContext(context7).draw();
stave8.setContext(context8).draw();


var notes1 = [
  new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "8d"}).addDot(0),
  new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "16"}),
  new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: "8"}),
  new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "8"}),
];
var voice1 = new VF.Voice({num_beats:2, beat_value: 4});
voice1.addTickables(notes1);
var formatter1 = new VF.Formatter().joinVoices([voice1]).format([voice1],350);
voice1.draw(context1, stave1);

var notes2 = [
  new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "8"}),
  new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "8"}),
  new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "q"}),
];
var voice2 = new VF.Voice({num_beats:2, beat_value: 4});
voice2.addTickables(notes2);
var formatter2 = new VF.Formatter().joinVoices([voice2]).format([voice2],350);
voice2.draw(context2, stave2);

var notes3 = [
  new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "8"}),
  new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "8"}),
  new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "q"}),
];
var voice3 = new VF.Voice({num_beats:2, beat_value: 4});
voice3.addTickables(notes3);
var formatter3 = new VF.Formatter().joinVoices([voice3]).format([voice3],350);
voice3.draw(context3, stave3);

var notes4 = [
  new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "8"}),
  new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "8"}),
  new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "q"}),
];
var voice4 = new VF.Voice({num_beats:2, beat_value: 4});
voice4.addTickables(notes4);
var formatter4 = new VF.Formatter().joinVoices([voice4]).format([voice4],350);
voice4.draw(context4, stave4);

var notes5 = [
  new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "8d"}).addDot(0),
  new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "16"}),
  new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: "8"}),
  new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "8"}),
];
var voice5 = new VF.Voice({num_beats:2, beat_value: 4});
voice5.addTickables(notes5);
var formatter5 = new VF.Formatter().joinVoices([voice5]).format([voice5],350);
voice5.draw(context5, stave5);

var notes6 = [
  new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "8"}),
  new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "8"}),
  new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "q"}),
];
var voice6 = new VF.Voice({num_beats:2, beat_value: 4});
voice6.addTickables(notes6);
var formatter6 = new VF.Formatter().joinVoices([voice6]).format([voice6],350);
voice6.draw(context6, stave6);

var notes7 = [
  new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "8"}),
  new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "8"}),
  new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "8d"}).addDot(0),
  new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "16"}),
];
var voice7 = new VF.Voice({num_beats:2, beat_value: 4});
voice7.addTickables(notes7);
var formatter7 = new VF.Formatter().joinVoices([voice7]).format([voice7],350);
voice7.draw(context7, stave7);

var notes8 = [
  new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: "h"}),
];
var voice8 = new VF.Voice({num_beats:2, beat_value: 4});
voice8.addTickables(notes8);
var formatter8 = new VF.Formatter().joinVoices([voice8]).format([voice8],350);
voice8.draw(context8, stave8);
});
