var windowWidth, windowHeight;

// dimensions for divs
var libraryWidth, libraryHeight;
var mainWidth, mainHeight;
var menuWidth, menuHeight;
var scoreWidth, scoreHeight;
var importWidth, importHeight;

var importDragging = false;

$( document ).ready(function() {

  document.getElementById('files').addEventListener('change', handleFileSelect, false);

  $("#lineImportDiv").mousedown(function(e){
    e.preventDefault();
    console.log("importDragg");

    importDragging = true;
    var importDiv = $("#importDiv");
    var ghostbar = $('<div>',
                    {id:'ghostbar', css: {width: importDiv.outerWidth(), left: importDiv.offset().left, top: importDiv.offset().top}
                  }).appendTo('body');
    $(document).mousemove(function(e){
      if(e.pageY > windowHeight * 4 / 5){
        ghostbar.css("top", windowHeight * 4 / 5);
      }
      else{
        ghostbar.css("top",e.pageY);
      }
    });
  });

  $(document).mouseup(function(e){
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
    let len = selected_units.length;
    console.log(len);
    if(len == 0){
      $("#invertChordButton").hide();
      $("#invertChordButton2").show();

      $("#changeRhythmButton").hide();
      $("#changeRhythmButton2").show();

      $("#deleteChordsButton").hide();
      $("#deleteChordsButton2").show();

      $("#deleteBarsButton").hide();
      $("#deleteBarsButton2").show();

      $("#insertBarAfterButton").hide();
      $("#insertBarAfterButton2").show();
    }
    else if(len == 1){
      $("#invertChordButton2").hide();
      $("#invertChordButton").show();

      $("#changeRhythmButton2").hide();
      $("#changeRhythmButton").show();

      $("#deleteChordsButton2").hide();
      $("#deleteChordsButton").show();

      $("#deleteBarsButton2").hide();
      $("#deleteBarsButton").show();

      $("#insertBarAfterButton2").hide();
      $("#insertBarAfterButton").show();
    }
    else {
      $("#invertChordButton2").hide();
      $("#invertChordButton").show();

      $("#changeRhythmButton2").hide();
      $("#changeRhythmButton").show();

      $("#deleteChordsButton2").hide();
      $("#deleteChordsButton").show();

      $("#deleteBarsButton2").hide();
      $("#deleteBarsButton").show();

      $("#insertBarAfterButton").hide();
      $("#insertBarAfterButton2").show();
    }
  });


  addUnit();
  /*
  addUnit();
  addUnit();
  addUnit();
  addUnit();
  addUnit();
  addUnit();
  addUnit();
  addUnit();
  addUnit();
  addUnit();
  addUnit();
*/

  setChord(0, "C");
  /*
  setChord(1, "C");
  setChord(2, "C");
  setChord(3, "C");

  setChord(4, "C");
  setChord(5, "C");
  setChord(6, "C");
  setChord(7, "C");
  setChord(8, "C");
  setChord(9, "C");
  setChord(10, "C");
  setChord(11, "C");
  */

  initSize();
  renderScore();
  document.getElementById('files').addEventListener('change', handleFileSelect, false);

  $("#mainDiv").removeClass("hidden");
  $("#mainDiv").css("display", "flex");

  $(window).resize(function(){
    updateSize();
    renderScore();
  });

  function init() {
    document.getElementById("#lineImportDiv").onmousedown = on_mouse_down;
    document.onmouseup = on_mouse_up;
    document.onmousemove = on_mouse_move;
  }
});

function updateSize(){
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  libraryWidth = 240;
  libraryHeight = windowHeight;

  mainWidth = windowWidth - libraryWidth;
  mainHeight = windowHeight;

  menuWidth = mainWidth;
  menuHeight = Math.floor(windowHeight / 12);

  importWidth = mainWidth - 30;
  importHeight = $("#importDiv").height();

  scoreWidth = mainWidth;
  scoreHeight = windowHeight - menuHeight - importHeight;

  titleHeight = 173
  titleWidth = libraryWidth;
  treeHeight = libraryHeight - titleHeight;

  treeWidth = libraryWidth;

  $("#mainDiv").height(windowHeight);
  $("#mainDiv").width(windowWidth);

  $("#libraryDiv").height(libraryHeight);
  $("#libraryDiv").width(libraryWidth);

  $("#menuDiv").height(menuHeight);
  $("#menuDiv").width(menuWidth);

  $("#selectionDiv").height(menuHeight);
  $("#iconSelection").height(menuHeight);
  $("#textSelection").height(menuHeight);
  $("#selectedText").height(menuHeight);
  $("#selectedText").css("line-height", menuHeight+"px");

  $("#buttonDiv").height(menuHeight);
  $("#buttonDiv").width(menuWidth-300);

  $("#noselect").height(Math.floor(menuHeight*0.4));
  $("#noselect").width(Math.floor(menuHeight*0.4));

  $("#selected").height(Math.floor(menuHeight*0.4));
  $("#selected").width(Math.floor(menuHeight*0.4));

  $(".selectbutton").css("padding-top" , Math.floor(menuHeight*0.3));


  $("#line").width(menuWidth);

  $(".menubutton").css("padding-top" , Math.floor(menuHeight*0.1));
  $(".menubutton").css("padding-left" , Math.floor(menuHeight*0.23));
  $(".menubutton").css("padding-right" , Math.floor(menuHeight*0.23));

  $("#playButton").height(Math.floor(menuHeight*0.77));
  $("#playButton").width(Math.floor(menuHeight*0.46));

  $("#stopButton").height(Math.floor(menuHeight*0.77));
  $("#stopButton").width(Math.floor(menuHeight*0.46));

  $("#invertChordButton").height(Math.floor(menuHeight*0.77));
  $("#invertChordButton").width(Math.floor(menuHeight*0.99));

  $("#changeRhythmButton").height(Math.floor(menuHeight*0.77));
  $("#changeRhythmButton").width(Math.floor(menuHeight*1.14));

  $("#deleteChordsButton").height(Math.floor(menuHeight*0.77));
  $("#deleteChordsButton").width(Math.floor(menuHeight*1.06));

  $("#deleteBarsButton").height(Math.floor(menuHeight*0.77));
  $("#deleteBarsButton").width(Math.floor(menuHeight*0.85));

  $("#insertBarAfterButton").height(Math.floor(menuHeight*0.77));
  $("#insertBarAfterButton").width(Math.floor(menuHeight*1.15));

  $("#invertChordButton2").height(Math.floor(menuHeight*0.77));
  $("#invertChordButton2").width(Math.floor(menuHeight*0.99));

  $("#changeRhythmButton2").height(Math.floor(menuHeight*0.77));
  $("#changeRhythmButton2").width(Math.floor(menuHeight*1.14));

  $("#deleteChordsButton2").height(Math.floor(menuHeight*0.77));
  $("#deleteChordsButton2").width(Math.floor(menuHeight*1.06));

  $("#deleteBarsButton2").height(Math.floor(menuHeight*0.77));
  $("#deleteBarsButton2").width(Math.floor(menuHeight*0.85));

  $("#insertBarAfterButton2").height(Math.floor(menuHeight*0.77));
  $("#insertBarAfterButton2").width(Math.floor(menuHeight*1.15));


  $("#addBarsButton").height(Math.floor(menuHeight*0.77));
  $("#addBarsButton").width(Math.floor(menuHeight*0.69));

  $("#exportScoreButton").height(Math.floor(menuHeight*0.77));
  $("#exportScoreButton").width(Math.floor(menuHeight));

  $("#scoreDiv").height(scoreHeight);
  $("#scoreDiv").width(scoreWidth);

  $("#importDiv").height(importHeight);
  $("#importDiv").width(importWidth);

  $("#headerImport").height(20);

  $("#melody").height(importHeight-$("#headerImport").height()-3);
  $("#melody").width(importWidth);

  $("#tempTitle").width(scoreWidth);
  $("#tempTitle").css("text-align", "center");
  $("#tempTitle").css("font-size", "24px");

  $("#chordplayDiv").height(titleHeight);
  $("#chordplayDiv").width(titleWidth);

  //$("#chordtreeDiv").height(treeHeight);
  $("#chordtreeDiv").width(treeWidth);
  $("#chordtreeDiv").height(windowHeight-titleHeight);

  $("#homeDiv").height(70); // need to fix
  $("#homeDiv").width(titleWidth-68);
  $("#searchDiv").height(titleHeight-70);
  $("#searchDiv").width(titleWidth-36);

  $(".basetree").width(titleWidth);

}

function initSize(){
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  libraryWidth = 240;
  libraryHeight = windowHeight;

  mainWidth = windowWidth - libraryWidth;
  mainHeight = windowHeight;

  menuWidth = mainWidth;
  menuHeight = Math.floor(windowHeight / 12);

  importWidth = mainWidth - 30;
  importHeight = Math.floor(windowHeight / 3) - 20;

  scoreWidth = mainWidth;
  scoreHeight = windowHeight - menuHeight - importHeight;

  titleHeight = 173
  titleWidth = libraryWidth;
  treeHeight = libraryHeight - titleHeight;

  treeWidth = libraryWidth;

  $("#mainDiv").height(windowHeight);
  $("#mainDiv").width(windowWidth);

  $("#libraryDiv").height(libraryHeight);
  $("#libraryDiv").width(libraryWidth);

  $("#menuDiv").height(menuHeight);
  $("#menuDiv").width(menuWidth);

  $("#selectionDiv").height(menuHeight);
  $("#iconSelection").height(menuHeight);
  $("#textSelection").height(menuHeight);
  $("#selectedText").height(menuHeight);
  $("#selectedText").css("line-height", menuHeight +"px");

  $("#buttonDiv").height(menuHeight);
  $("#buttonDiv").width(menuWidth-300);

  $("#noselect").height(Math.floor(menuHeight*0.4));
  $("#noselect").width(Math.floor(menuHeight*0.4));

  $("#selected").height(Math.floor(menuHeight*0.4));
  $("#selected").width(Math.floor(menuHeight*0.4));

  $(".selectbutton").css("padding-top" , Math.floor(menuHeight*0.3));

  $("#line").width(menuWidth);

  $(".menubutton").css("padding-top" , Math.floor(menuHeight*0.1));
  $(".menubutton").css("padding-left" , Math.floor(menuHeight*0.23));
  $(".menubutton").css("padding-right" , Math.floor(menuHeight*0.23));


  $("#playButton").height(Math.floor(menuHeight*0.77));
  $("#playButton").width(Math.floor(menuHeight*0.46));

  $("#stopButton").height(Math.floor(menuHeight*0.77));
  $("#stopButton").width(Math.floor(menuHeight*0.46));

  $("#invertChordButton").height(Math.floor(menuHeight*0.77));
  $("#invertChordButton").width(Math.floor(menuHeight*0.99));

  $("#changeRhythmButton").height(Math.floor(menuHeight*0.77));
  $("#changeRhythmButton").width(Math.floor(menuHeight*1.14));

  $("#deleteChordsButton").height(Math.floor(menuHeight*0.77));
  $("#deleteChordsButton").width(Math.floor(menuHeight*1.06));

  $("#deleteBarsButton").height(Math.floor(menuHeight*0.77));
  $("#deleteBarsButton").width(Math.floor(menuHeight*0.85));

  $("#insertBarAfterButton").height(Math.floor(menuHeight*0.77));
  $("#insertBarAfterButton").width(Math.floor(menuHeight*1.15));

  $("#invertChordButton2").height(Math.floor(menuHeight*0.77));
  $("#invertChordButton2").width(Math.floor(menuHeight*0.99));

  $("#changeRhythmButton2").height(Math.floor(menuHeight*0.77));
  $("#changeRhythmButton2").width(Math.floor(menuHeight*1.14));

  $("#deleteChordsButton2").height(Math.floor(menuHeight*0.77));
  $("#deleteChordsButton2").width(Math.floor(menuHeight*1.06));

  $("#deleteBarsButton2").height(Math.floor(menuHeight*0.77));
  $("#deleteBarsButton2").width(Math.floor(menuHeight*0.85));

  $("#insertBarAfterButton2").height(Math.floor(menuHeight*0.77));
  $("#insertBarAfterButton2").width(Math.floor(menuHeight*1.15));


  $("#addBarsButton").height(Math.floor(menuHeight*0.77));
  $("#addBarsButton").width(Math.floor(menuHeight*0.69));

  $("#exportScoreButton").height(Math.floor(menuHeight*0.77));
  $("#exportScoreButton").width(Math.floor(menuHeight));

  $("#scoreDiv").height(scoreHeight);
  $("#scoreDiv").width(scoreWidth);

  $("#importDiv").height(importHeight);
  $("#importDiv").width(importWidth);

  $("#headerImport").height(20);

  $("#melody").height(importHeight-$("#headerImport").height()-3);
  $("#melody").width(importWidth);

  $("#tempTitle").width(scoreWidth);
  $("#tempTitle").css("text-align", "center");
  $("#tempTitle").css("font-size", "24px");

  $("#chordplayDiv").height(titleHeight);
  $("#chordplayDiv").width(titleWidth);

  //$("#chordtreeDiv").height(treeHeight);
  $("#chordtreeDiv").width(treeWidth);
  $("#chordtreeDiv").height(windowHeight-titleHeight);

  $("#homeDiv").height(70); // need to fix
  $("#homeDiv").width(titleWidth-68);
  $("#searchDiv").height(titleHeight-70);
  $("#searchDiv").width(titleWidth-36);

  $(".basetree").width(titleWidth);

}

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object

  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        // Render thumbnail.
        var div = document.createElement('div');

        div.innerHTML = ['<img class="thumb" src="', e.target.result,
                          '" title="', escape(theFile.name), '"/>'].join('');
        document.getElementById('list').insertBefore(div, null);
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}

function menuUpdate() {
  let len = selected_units.length;
  if(len == 0){
    $("#invertChordButton").hide();
    $("#invertChordButton2").show();

    $("#changeRhythmButton").hide();
    $("#changeRhythmButton2").show();

    $("#deleteChordsButton").hide();
    $("#deleteChordsButton2").show();

    $("#deleteBarsButton").hide();
    $("#deleteBarsButton2").show();

    $("#insertBarAfterButton").hide();
    $("#insertBarAfterButton2").show();

    $("#selectedText").css("color", "#B1B1B1");
    $("#selectedText").text("0 selected");
    $("#noselect").show();
    $("#selected").hide();
  }
  else if(len == 1){
    $("#invertChordButton2").hide();
    $("#invertChordButton").show();

    $("#changeRhythmButton2").hide();
    $("#changeRhythmButton").show();

    $("#deleteChordsButton2").hide();
    $("#deleteChordsButton").show();

    $("#deleteBarsButton2").hide();
    $("#deleteBarsButton").show();

    $("#insertBarAfterButton2").hide();
    $("#insertBarAfterButton").show();

    $("#selectedText").css("color", "#4285F4");
    $("#selectedText").text(selected_units.length + " selected");
    $("#noselect").hide();
    $("#selected").show();
  }
  else {
    $("#invertChordButton2").hide();
    $("#invertChordButton").show();

    $("#changeRhythmButton2").hide();
    $("#changeRhythmButton").show();

    $("#deleteChordsButton2").hide();
    $("#deleteChordsButton").show();

    $("#deleteBarsButton2").hide();
    $("#deleteBarsButton").show();

    $("#insertBarAfterButton").hide();
    $("#insertBarAfterButton2").show();

    $("#selectedText").css("color", "#4285F4");
    $("#selectedText").text(selected_units.length + " selected");
    $("#noselect").hide();
    $("#selected").show();
  }
}

/*
var startpos, diffpos=0, range=50;
var isEnable = false;


function on_mouse_down(e) {
  startpos = event.clientX + diffpos;
  isEnable = true;
  return false;
}

function on_mouse_up(e) {
  isEnable = false;
  return false;
}

function on_mouse_move(e) {
  if (isEnable) {
    pos = event.clientX;
    diffpos = startpos-pos;

    if (diffpos > -(width-range) && diffpos < (width-range)) {
      document.getElementById("#importDiv").style.height = importHeight - diffpos + "px";
    }
  }
}
*/
