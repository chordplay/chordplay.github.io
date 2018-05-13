$( document ).ready(function() {
  var windowWidth, windowHeight;

  // dimensions for divs
  var libraryWidth, libraryHeight;
  var mainWidth, mainHeight;
  var menuWidth, menuHeight;
  var scoreWidth, scoreHeight;
  var importWidth, importHeight;

  // TODO: stuff for bar sizes
  var firstBarWidth;
  var firstBarHeight;
  var restBarWidth;
  var restBarHeight;

  updateSize();

  function updateSize(){
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    libraryWidth = Math.floor(windowWidth / 8);
    libraryHeight = windowHeight;

    mainWidth = windowWidth - libraryWidth;
    mainHeight = windowHeight;

    menuWidth = mainWidth;
    menuHeight = Math.floor(windowHeight / 12);

    scoreWidth = mainWidth;
    scoreHeight = windowHeight - menuHeight;

    importWidth = mainWidth;
    importHeight = Math.floor(windowHeight / 3);

    $("#mainDiv").height(windowHeight);
    $("#mainDiv").width(windowWidth);

    $("#libraryDiv").height(libraryHeight);
    $("#libraryDiv").width(libraryWidth);

    $("#menuDiv").height(menuHeight);
    $("#menuDiv").width(menuWidth);

    $("#line").width(menuWidth);   
    $("#line").css("padding-top" , menuHeight*0.02); 

    $(".menubutton").css("padding-top" , menuHeight*0.1);
    $(".menubutton").css("padding-left" , menuHeight*0.23);
    $(".menubutton").css("padding-right" , menuHeight*0.23);

    $("#playButton").height(menuHeight*0.77);
    $("#playButton").width(menuHeight*0.46);

    $("#invertChordButton").height(menuHeight*0.77);
    $("#invertChordButton").width(menuHeight*0.99);

    $("#changeRhythmButton").height(menuHeight*0.77);
    $("#changeRhythmButton").width(menuHeight*1.14);

    $("#deleteChordsButton").height(menuHeight*0.77);
    $("#deleteChordsButton").width(menuHeight*1.06);

    $("#deleteBarsButton").height(menuHeight*0.77);
    $("#deleteBarsButton").width(menuHeight*0.85);

    $("#insertBarAfterButton").height(menuHeight*0.77);
    $("#insertBarAfterButton").width(menuHeight*1.15);


    $("#addBarsButton").height(menuHeight*0.77);
    $("#addBarsButton").width(menuHeight*0.69);

    $("#exportScoreButton").height(menuHeight*0.77);
    $("#exportScoreButton").width(menuHeight);

    $("#scoreDiv").height(scoreHeight);
    $("#scoreDiv").width(scoreWidth);

    $("#importDiv").height(importHeight);
    $("#importDiv").width(importWidth);
    $("#importDiv").css("margin-top", -importHeight);

    $("#melody").height(importHeight-30);
    $("#melody").width(importWidth);
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

  document.getElementById('files').addEventListener('change', handleFileSelect, false);


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

  function init() {
    document.getElementById("#lineImportDiv").onmousedown = on_mouse_down;
    document.onmouseup = on_mouse_up;
    document.onmousemove = on_mouse_move;

  }


  $(window).resize(function(){
    updateSize();
  });


});
