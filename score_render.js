
// renderer height = 223px
// lineDiv height = 223+textbox height (auto)

VF = Vex.Flow;
var count = 0;
var multiSelecting = false;
var dragStartX, dragStartY;
var multiSelectBegin, multiSelectEnd = -1;
var multiFirst, multiLast;
var dragThreshold = 30;
var mouseInScore;


function dragStuff(){
  $(".halfBar").unbind("click");
  $(".halfBar").unbind("mousedown");
  $(".halfBar").unbind("mouseenter");
  $(".halfBar").unbind("mouseleave");
  $(document).unbind("mouseup");

  $(".halfBar").click(function(event) {
      let prevSelect = this.getAttribute("select");
      $(".halfBar").removeClass("selectedBar");
      $(".halfBar").attr("select", "false");
      let prevLen = selected_units.length;
      selected_units=[];
      if(prevLen > 1){
        this.setAttribute("select", "true");
        this.classList.add("selectedBar");
        selected_units.push(this.id.replace("unit",""));
        menuUpdate();
        return;
      }
      else{
        this.setAttribute("select", prevSelect);
      }

      let item = event.currentTarget;
      let selected = item.getAttribute("select") === "true";
      if(!multiSelecting){
        item.setAttribute("select", !selected);
      }

      let id = item.id.replace("unit", "");
      if(!selected){
          item.classList.add("selectedBar");
          selected_units.push(id);
      } else {
          item.classList.remove("selectedBar");
          selected_units.splice(selected_units.indexOf(id), 1);
      }
      menuUpdate();
      //console.log(event.currentTarget);
      //console.log(selected_units);
  });
  // multiple selection
  $(".halfBar").mousedown(function(e){
    multiSelectBegin = parseInt(this.id.replace("unit",""), 10);
    dragStartX = e.pageX;
    dragStartY = e.pageY;
    $(".halfBar").mousemove(function(e){
      let currX = e.pageX;
      let currY = e.pageY;
      let dist = Math.round(Math.sqrt(Math.pow(dragStartX - currX, 2) + Math.pow(dragStartY - currY, 2)));
      let currNumber = parseInt(this.id.replace("unit",""), 10);

      if(dist > dragThreshold){
        if(!multiSelecting){
          multiSelecting = true;
          console.log("Multi");
        }
      }

      if(multiSelecting){
        if(multiSelectEnd == -1){
          multiSelectEnd = parseInt(this.id.replace("unit", ""), 10);
        }
        multiFirst = Math.min(multiSelectBegin, multiSelectEnd);
        multiLast = Math.max(multiSelectBegin, multiSelectEnd);

        $(".halfBar").removeClass("selectedBar");

        for(var selBar = multiFirst; selBar <= multiLast; selBar++){
          $("#unit"+selBar).addClass("selectedBar");
        }
      }

    });
  });

  $(".halfBar").mouseenter(function(){
    document.body.style.cursor = 'pointer';
    mouseInScore = true;
    if(multiSelecting){
      multiSelectEnd = parseInt(this.id.replace("unit", ""), 10);
    }
  });

  $(".halfBar").mouseleave(function(){
    document.body.style.cursor = 'auto';
    mouseInScore = false;
  });

  $(document).mouseup(function(e){
    if(multiSelecting) {
      $(".halfBar").attr("select", "false");
      selected_units=[];
      for(var i = multiFirst; i <= multiLast; i++){
        $("#unit"+i).attr("select", "true");
        selected_units.push(i.toString());
      }
      menuUpdate();
      multiSelectBegin = -1;
      multiSelectEnd = -1;
    }

    if(importDragging) {
      var newHeight;
      if(e.pageY > windowHeight * 4 / 5){
        newHeight = windowHeight * 1 / 5 + 2;
      }
      else{
        newHeight = mainHeight - e.pageY + 2;
      }
      $("#importDiv").height(newHeight);
      $("#ghostbar").remove();
      $(document).unbind('mousemove');
      updateSize();

      importDragging = false;
    }

    $(".halfBar").unbind('mousemove');
    multiSelecting = false;

    menuUpdate();
  });

  $("#scoreDiv").click(function(e){
    if(!mouseInScore){
      $(".halfBar").removeClass("selectedBar");
      $(".halfBar").attr("select", "false");
      selected_units=[];
      menuUpdate();
    }
  })
}

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
        $("#barLine"+line).append("<div class='firstUnit halfBar' id='unit"+ numScore +"' select='false' ondragover='allowDrop(event)' ondrop='dropChord(event)'> </div>");
        $("#unit"+numScore).append("<input type='text' class='chordText firstText' id='chordText"+ numScore +"'/>");
        $("#unit"+numScore).append("<div class='firstUnit' id='renderDiv"+ numScore +"'></div>");
      }
      else {
        rendererWidth = restUnitWidth;
        $("#barLine"+line).append("<div class='restUnit halfBar' id='unit"+ numScore +"' select='false' ondragover='allowDrop(event)' ondrop='dropChord(event)'></div>");
        $("#unit"+numScore).append("<input type='text' class='chordText' id='chordText"+ numScore +"'/>");
        $("#unit"+numScore).append("<div class='restUnit' id='renderDiv"+ numScore +"'></div>");
      }
      if(score[numScore].chord_name === "rest"){
        $("#chordText"+numScore).val("");
      }
      else{
        $("#chordText"+numScore).val(score[numScore].chord_name);
      }

      if(selected_units.includes(numScore)) {
        //TODO: think of how to update newly drawn scores to maintain selection
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
      else{
        var restStartX = startX;
      }

      var rightNotes = [];
      var leftNotes = [];
      var currUnit = score[numScore];
      var staveNote;

      for(var i=0; i < currUnit.right.length; i++) {
        var currNote = currUnit.right[i];
        var durationString;
        var hasDot = false;
        if(currNote.is_rest) {
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
        if(currNote.is_rest) {
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

  $(".chordText").css("margin-left",restStartX);
  $(".firstText").css("margin-left",firstStartX);

  dragStuff();
}
