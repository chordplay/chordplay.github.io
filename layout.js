var windowWidth, windowHeight;

// dimensions for divs
var libraryWidth, libraryHeight;
var mainWidth, mainHeight;
var menuWidth, menuHeight;
var scoreWidth, scoreHeight;
var importWidth, importHeight;

$( document ).ready(function() {

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
  addUnit();

  setChord(0, "C");
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
  console.log(score);

  updateSize();
  renderScore();

  $(window).resize(function(){
    updateSize();
    renderScore();
  });
});

function updateSize(){
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  libraryWidth = Math.floor(windowWidth / 8);
  libraryHeight = windowHeight;

  mainWidth = windowWidth - libraryWidth;
  mainHeight = windowHeight;

  menuWidth = mainWidth;
  menuHeight = Math.floor(windowHeight / 12);

  importWidth = mainWidth;
  importHeight = Math.floor(windowHeight / 3);

  scoreWidth = mainWidth;
  scoreHeight = windowHeight - menuHeight - importHeight;

  $("#mainDiv").height(windowHeight);
  $("#mainDiv").width(windowWidth);

  $("#libraryDiv").height(libraryHeight);
  $("#libraryDiv").width(libraryWidth);

  $("#menuDiv").height(menuHeight);
  $("#menuDiv").width(menuWidth);

  $("#scoreDiv").height(scoreHeight);
  $("#scoreDiv").width(scoreWidth);

  $("#tempTitle").width(scoreWidth);
  $("#tempTitle").css("text-align", "center");
  $("#tempTitle").css("font-size", "24px");

  $("#importDiv").height(importHeight);
  $("#importDiv").width(importWidth);
  //$("#importDiv").css("margin-top", importHeight);
}
