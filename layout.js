var windowWidth, windowHeight;

// dimensions for divs
var libraryWidth, libraryHeight;
var mainWidth, mainHeight;
var menuWidth, menuHeight;
var scoreWidth, scoreHeight;
var importWidth, importHeight;

$( document ).ready(function() {
  updateSize();
  renderScore();

  addUnit();
  // addUnit();
  // addUnit();
  // addUnit();

  setChord(0, "C/4");

  var u = new Unit();
  u.setChord("Ab");
  console.log(u.chord_name);
  console.log(u);
  console.log(u.right[0].is_rest);

  function updateSize() {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;

      libraryWidth = Math.floor(windowWidth / 8);
      libraryHeight = windowHeight;
  }

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
