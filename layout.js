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

  var u = new Unit("Ab");
  console.log(u.chord);
  console.log(u);
  console.log(u.right[0].rest);

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

    $("#scoreDiv").height(scoreHeight);
    $("#scoreDiv").width(scoreWidth);

    $("#importDiv").height(importHeight);
    $("#importDiv").width(importWidth);
    $("#importDiv").css("margin-top", -importHeight);
  }

  $(window).resize(function(){
    updateSize();
  });


});
