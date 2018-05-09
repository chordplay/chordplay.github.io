$( document ).ready(function() {
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  /*
  // make sure width:height = 16:9
  if(windowWidth / 16 * 9 > windowHeight) {
    windowWidth = Math.floor(windowHeight / 9 * 16)
  }
  else {
    windowHeight = Math.floor(windowWidth / 16 * 9);
  }
  */

  // dimensions for divs
  var libraryWidth = Math.floor(windowWidth / 5);
  var libraryHeight = windowHeight;

  var mainWidth = windowWidth - libraryWidth;
  var mainHeight = windowHeight;

  var menuWidth = mainWidth;
  var menuHeight = Math.floor(windowHeight / 12);

  var scoreWidth = mainWidth;
  var scoreHeight = windowHeight - menuHeight;

  var firstBarWidth;
  var firstBarHeight;

  var restBarWidth;
  var restBarHeight;

  var importWidth = mainWidth;
  var importHeight = Math.floor(windowHeight / 3);

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
});
