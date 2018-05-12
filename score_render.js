
// renderer height = 223px
// lineDiv height = 223+textbox height (auto)

VF = Vex.Flow;
var count = 0;
function renderScore(){
  var lineWidth = Math.floor(scoreWidth * 9 / 10);
  var lineMargin = Math.floor((scoreWidth - lineWidth) / 2);
  var firstUnitWidth = Math.floor(lineWidth * 125 / 720);
  var restUnitWidth = Math.floor((lineWidth - firstUnitWidth) / 7);

  $(".barLine").remove();

  var scoreLen = score.length;
  var numLines = Math.ceil(score.length / 8);

  var numScore = 0;

  // add lines
  for(var line = 0; line < numLines; line++){
    $("#scoreDiv").append("<div class='barLine' id='barLine"+line+"'></div>");

    // add units
    for(var lineScore = 0; lineScore < 8; lineScore++){
      if(numScore >= score.length){
        break;
      }

      var rendererWidth;

      if(lineScore == 0){
        rendererWidth = firstUnitWidth;
        $("#barLine"+line).append("<div class='firstUnit halfBar' id='unit"+ numScore +"'></div>");
        $("#unit"+numScore).append("<input type='text' class='chordText firstText' id='chordText"+ numScore +"'/>");
        $("#unit"+numScore).append("<div class='firstUnit' id='renderDiv"+ numScore +"'></div>");
      }
      else {
        rendererWidth = restUnitWidth;
        $("#barLine"+line).append("<div class='restUnit halfBar' id='unit"+ numScore +"'></div>");
        $("#unit"+numScore).append("<input type='text' class='chordText' id='chordText"+ numScore +"'/>");
        $("#unit"+numScore).append("<div class='restUnit' id='renderDiv"+ numScore +"'></div>");
      }

      // VexFlow rendering
      var currDiv = $("#renderDiv"+numScore).get(0);
      var currRenderer = new VF.Renderer(currDiv, VF.Renderer.Backends.SVG);
      var currCtx = currRenderer.getContext();

      currRenderer.resize(rendererWidth, 223);
      var rightStave, leftStave;

      if(lineScore == 0) {
        rightStave = new VF.Stave(20, 0, rendererWidth-20).setEndBarType(VF.Barline.type.NONE);
        leftStave = new VF.Stave(20, 103, rendererWidth-20).setEndBarType(VF.Barline.type.NONE);
        rightStave.addClef("treble").addTimeSignature("4/4");
        leftStave.addClef("bass").addTimeSignature("4/4");
      }
      else if(lineScore % 2 ==  0) {
          rightStave = new VF.Stave(0, 0, rendererWidth).setEndBarType(VF.Barline.type.NONE).setBegBarType(VF.Barline.type.NONE);
          leftStave = new VF.Stave(0, 103, rendererWidth).setEndBarType(VF.Barline.type.NONE).setBegBarType(VF.Barline.type.NONE);
      }
      else {
        rightStave = new VF.Stave(0, 0, rendererWidth-1).setBegBarType(VF.Barline.type.NONE);
        leftStave = new VF.Stave(0, 103, rendererWidth-1).setBegBarType(VF.Barline.type.NONE);
      }

      var brace = new VF.StaveConnector(rightStave, leftStave).setType(3);
      var lineLeft = new VF.StaveConnector(rightStave, leftStave).setType(1);
      var lineRight = new Vex.Flow.StaveConnector(rightStave, leftStave).setType(6);

      rightStave.setContext(currCtx).draw();
      leftStave.setContext(currCtx).draw();

      if(lineScore == 0) {
        brace.setContext(currCtx).draw();
        lineLeft.setContext(currCtx).draw();
      }

      if(numScore == score.length - 1) {
        lineRight.setContext(currCtx).draw();
      }

      var startX = Math.max(rightStave.getNoteStartX(), leftStave.getNoteStartX());
      rightStave.setNoteStartX(startX);
      leftStave.setNoteStartX(startX);

      if(lineScore == 0){
        var firstStartX = startX;
      }

      var rightNotes = [];
      var leftNotes = [];
      var currUnit = score[numScore];
      var staveNote;

      for(var i=0; i < currUnit.right.length; i++) {
        var currNote = currUnit.right[i];
        var durationString;
        var hasDot = false;
        if(currNote.is_rest == 1) {
          durationString = currNote.duration + "r";
        }
        else{
          durationString = currNote.duration;
        }
        if(currNote.duration.includes('d')) {
          hasDot = true;
        }

        staveNote = new VF.StaveNote({clef: "treble", keys: currNote.keys, duration: durationString, auto_stem: true});

        for(var j = 0; j < currNote.keys.length; j++){
          if(currNote.keys[j].includes("b")) {
            staveNote = staveNote.addAccidental(j, new VF.Accidental("b"));
          }
          else if(currNote.keys[j].includes("#")) {
            staveNote = staveNote.addAccidental(j, new VF.Accidental("#"));
          }
        }
        if(hasDot) {
          rightNotes.push(staveNote.addDotToAll());
        }
        else{
          rightNotes.push(staveNote);
        }
      }

      for(var i=0; i < currUnit.left.length; i++) {
        var currNote = currUnit.left[i];
        var durationString;
        var hasDot = false;
        if(currNote.is_rest == 1) {
          durationString = currNote.duration + "r";
        }
        else{
          durationString = currNote.duration;
        }
        if(currNote.duration.includes('d')) {
          hasDot = true;
        }
        staveNote = new VF.StaveNote({clef: "bass", keys: currNote.keys, duration: durationString, auto_stem: true});

        for(var j = 0; j < currNote.keys.length; j++){
          if(currNote.keys[j].includes("b")) {
            staveNote = staveNote.addAccidental(j, new VF.Accidental("b"));
          }
          else if(currNote.keys[j].includes("#")) {
            staveNote = staveNote.addAccidental(j, new VF.Accidental("#"));
          }
        }
        if(hasDot) {
          leftNotes.push(staveNote.addDotToAll(0));
        }
        else{
          leftNotes.push(staveNote);
        }
      }
      var rightVoice = new VF.Voice({num_beats:2, beat_value: 4}); // fix 2/4 for now
      var leftVoice = new VF.Voice({num_beats:2, beat_value: 4});

      rightVoice.addTickables(rightNotes);
      leftVoice.addTickables(leftNotes);

      var rightFormatter = new VF.Formatter().joinVoices([rightVoice]).formatToStave([rightVoice], rightStave);
      var leftFormatter = new VF.Formatter().joinVoices([leftVoice]).formatToStave([leftVoice], leftStave);

      rightVoice.draw(currCtx, rightStave);
      leftVoice.draw(currCtx, leftStave);

      numScore++;
    }
  }

  $(".barLine").width(lineWidth);
  $(".barLine").css("margin-left",lineMargin);
  $(".barLine").css("margin-right",lineMargin);

  $(".firstUnit").width(firstUnitWidth);
  $(".restUnit").width(restUnitWidth);

  $(".chordText").css("margin-left",startX);
  $(".firstText").css("margin-left",firstStartX);
}
