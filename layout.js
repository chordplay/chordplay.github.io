var windowWidth, windowHeight;

// dimensions for divs
var libraryWidth, libraryHeight;
var mainWidth, mainHeight;
var menuWidth, menuHeight;
var scoreWidth, scoreHeight;
var importWidth, importHeight;

var importDragging = false;

$(document).ready(function () {

    document.getElementById('files').addEventListener('change', handleFileSelect, false);

    $(document).on("keydown", ".chordText", function (event) {
        if (event.keyCode === 13) {
            if ($(this).val().length === 0) {
                event.preventDefault();
                return false;
            } else {
                var chord = $(this).val();
                var id = $(this).attr("id");
                console.log(chord);
                if (!ChordList.includes(chord)) {
                    return false;
                }
                var index = id.replace("chordText", "");
                window.setChord(index, chord);
                renderScore();
                if ((score.length - 1) == index) {
                    addUnit();
                    renderScore();
                }
            }
        }
    });

    $(document).on("focusin", ".chordText", function () {
        $(this).addClass("focused");
        if (!$(this).data("autocomplete")) { // If the autocomplete wasn't called yet:
            $(this).autocomplete({
                source: ChordList,
                select: function (event, ui) {
                    event.preventDefault();
                    let chord = ui.item.value;
                    let index = $(this).context.id.replace("chordText", "");
                    setChord(index, chord);
                    renderScore();

                    if (index * 1 < score.length - 1) {
                        $("#chordText" + (index * 1 + 1)).focus();
                        // console.log($("#chordText" + (index * 1 + 1)));
                    } else {
                        addUnit();
                        renderScore();
                        $("#chordText" + (score.length - 1)).focus();
                    }
                    selected_units = [];
                    menuUpdate();
                }
            });
        }
    });

    $(document).on("focusout", ".chordText", function(){
        $(this).val(score[this.closest("div").id.replace("unit", "")*1].chord_name);
        $(this).removeClass("focused");
    });

    $("#lineImportDiv").mousedown(function (e) {
        e.preventDefault();
        console.log("importDrag");

        importDragging = true;
        let importDiv = $("#importDiv");
        let ghostbar = $('<div>', {
            id: 'ghostbar',
            css: {width: importDiv.outerWidth(), left: importDiv.offset().left, top: importDiv.offset().top}
        }).appendTo('body');
        $(document).mousemove(function (e) {
            if (e.pageY > windowHeight * 4 / 5) {
                ghostbar.css("top", windowHeight * 4 / 5);
            }
            else {
                ghostbar.css("top", e.pageY);
            }
        });
    });

    addUnit();
    addUnit();
    addUnit();
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
  */

    setChord(0, "C");
    setChord(1, "F");
    setChord(2, "G");
    setChord(3, "C");
    /*
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

    $(window).resize(function () {
        updateSize();
        renderScore();
    });
});

function updateSize() {
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

    titleHeight = 180
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
    $("#selectedText").css("line-height", menuHeight + "px");

    $("#buttonDiv").height(menuHeight);
    $("#buttonDiv").width(menuWidth - 300);

    $("#noselect").height(Math.floor(menuHeight * 0.4));
    $("#noselect").width(Math.floor(menuHeight * 0.4));

    $("#selected").height(Math.floor(menuHeight * 0.4));
    $("#selected").width(Math.floor(menuHeight * 0.4));

    $(".selectbutton").css("padding-top", Math.floor(menuHeight * 0.3));

    $("#line").width(menuWidth);

    $(".menubutton").css("padding-top", Math.floor(menuHeight * 0.1));
    $(".menubutton").css("padding-left", Math.floor(menuHeight * 0.23));
    $(".menubutton").css("padding-right", Math.floor(menuHeight * 0.23));

    $("#playButton").height(Math.floor(menuHeight * 0.77));
    $("#playButton").width(Math.floor(menuHeight * 0.46));

    $("#pauseButton").height(Math.floor(menuHeight * 0.77));
    $("#pauseButton").width(Math.floor(menuHeight * 0.46));

    $("#stopButton").height(Math.floor(menuHeight * 0.77));
    $("#stopButton").width(Math.floor(menuHeight * 0.46));

    $("#invertChordButton").height(Math.floor(menuHeight * 0.77));
    $("#invertChordButton").width(Math.floor(menuHeight * 0.99));

    $("#changeRhythmButton").height(Math.floor(menuHeight * 0.77));
    $("#changeRhythmButton").width(Math.floor(menuHeight * 1.14));

    $("#deleteChordsButton").height(Math.floor(menuHeight * 0.77));
    $("#deleteChordsButton").width(Math.floor(menuHeight * 1.06));

    $("#deleteBarsButton").height(Math.floor(menuHeight * 0.77));
    $("#deleteBarsButton").width(Math.floor(menuHeight * 0.85));

    $("#insertBarAfterButton").height(Math.floor(menuHeight * 0.77));
    $("#insertBarAfterButton").width(Math.floor(menuHeight * 1.15));

    $("#invertChordButton2").height(Math.floor(menuHeight * 0.77));
    $("#invertChordButton2").width(Math.floor(menuHeight * 0.99));

    $("#changeRhythmButton2").height(Math.floor(menuHeight * 0.77));
    $("#changeRhythmButton2").width(Math.floor(menuHeight * 1.14));

    $("#deleteChordsButton2").height(Math.floor(menuHeight * 0.77));
    $("#deleteChordsButton2").width(Math.floor(menuHeight * 1.06));

    $("#deleteBarsButton2").height(Math.floor(menuHeight * 0.77));
    $("#deleteBarsButton2").width(Math.floor(menuHeight * 0.85));

    $("#insertBarAfterButton2").height(Math.floor(menuHeight * 0.77));
    $("#insertBarAfterButton2").width(Math.floor(menuHeight * 1.15));


    $("#addBarsButton").height(Math.floor(menuHeight * 0.77));
    $("#addBarsButton").width(Math.floor(menuHeight * 0.69));

    $("#exportScoreButton").height(Math.floor(menuHeight * 0.77));
    $("#exportScoreButton").width(Math.floor(menuHeight));

    $("#scoreDiv").height(scoreHeight);
    $("#scoreDiv").width(scoreWidth);

    $("#importDiv").height(importHeight);
    $("#importDiv").width(importWidth);

    $(".modal-content").width(mainWidth);

    $(".modal-header").width(mainWidth);

    $(".modal-body").width(mainWidth);


    $("#headerImport").height(20);

    $("#melody").height(importHeight - $("#headerImport").height() - 3);
    $("#melody").width(importWidth);

    $("#tempTitle").width(scoreWidth);
    $("#tempTitle").css("text-align", "center");
    $("#tempTitle").css("font-size", "24px");

    $("#chordplayDiv").height(titleHeight);
    $("#chordplayDiv").width(titleWidth);

    //$("#chordtreeDiv").height(treeHeight);
    $("#chordtreeDiv").width(treeWidth);
    $("#chordtreeDiv").height(windowHeight - titleHeight);

    $("#homeDiv").height(70); // need to fix
    $("#homeDiv").width(titleWidth - 68);
    $("#searchDiv").height(titleHeight - 70);
    $("#searchDiv").width(titleWidth - 36);

    $(".basetree").width(titleWidth);
}

function initSize() {
    windowHeight = window.innerHeight;
    importHeight = Math.floor(windowHeight / 3) - 20;
    $("#importDiv").height(importHeight);
    updateSize();
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
        reader.onload = (function (theFile) {
            return function (e) {
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
    if (len == 0) {
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
    } else if (len == 1) {
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
    } else {
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
