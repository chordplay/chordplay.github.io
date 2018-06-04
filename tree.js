var AllChord = ["C", "Cm", "C7", "Cm7", "CM7", "Csus4", "Caug", "Cdim",
      "C#", "C#m", "C#7", "C#m7", "C#M7", "C#sus4", "C#aug", "C#dim",
      "D", "Dm", "D7", "Dm7", "DM7", "Dsus4", "Daug", "Ddim",
      "Db", "Dbm", "Db7", "Dbm7", "DbM7", "Dbsus4", "Dbaug", "Dbdim",
      "D#", "D#m", "D#7", "D#m7", "D#M7", "D#sus4", "D#aug", "D#dim",
      "E", "Em", "E7", "Em7", "EM7", "Esus4", "Eaug", "Edim",
      "Eb", "Ebm", "Eb7", "Ebm7", "EbM7", "Ebsus4", "Ebaug", "Ebdim",
      "F", "Fm", "F7", "Fm7", "FM7", "Fsus4", "Faug", "Fdim",
    "F#", "F#m", "F#7", "F#m7", "F#M7", "F#sus4", "F#aug", "F#dim",
    "G", "Gm", "G7", "Gm7", "GM7", "Gsus4", "Gaug", "Gdim",
    "Gb", "Gbm", "Gb7", "Gbm7", "GbM7", "Gbsus4", "GbauGb", "Gbdim",
    "G#", "G#m", "G#7", "G#m7", "G#M7", "G#sus4", "G#aug", "G#dim",
    "A", "Am", "A7", "Am7", "AM7", "Asus4", "Aaug", "Adim",
    "Ab", "Abm", "Ab7", "Abm7", "AbM7", "Absus4", "Abaug", "Abdim",
    "A#", "A#m", "A#7", "A#m7", "A#M7", "A#sus4", "A#aug", "A#dim",
    "B", "Bm", "B7", "Bm7", "BM7", "Bsus4", "Baug", "Bdim",
    "Bb", "Bbm", "Bb7", "Bbm7", "BbM7", "Bbsus4", "Bbaug", "Bbdim",
  ];

var chordDragging = false;

$(document).ready(function(){

  var clickstate = false;
  var chordname;
  var openChord;
  var trtemp;

  $("#searchArea").autocomplete({
    minLength: 1,
    source: AllChord,
    select: function(event, ui){
      var chord = ui.item.value;
      var chordbase;

      if(chord.includes('#')){
        var temp = chord.split('#');
        chordbase = temp[0] + '\\#';
      }
      else if(chord.includes('b')){
        var temp = chord.split('b');
        if(temp[0] == 'A') chordbase = "G#";
        else{
          var Alphabet = String.fromCharCode(temp[0].charCodeAt(0)-1);
          chordbase = Alphabet + '\\#';
        }
      }
      else{
        chordbase = chord[0];
      }
      //event.preventDefault();
      console.log(chordbase);
      $("#"+chordbase).trigger("click");
      document.getElementById("searchArea").value = "";
    }
  })
  /*$(".chordText").autocomplete({
    minLength: 1,
    source: AllChord,
    select: function(event, ui){

    }
  })*/



  $.ui.autocomplete.filter = function (array, term) {
    var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
    return $.grep(array, function (value) {
      return matcher.test(value.label || value.value || value);
    });
  };

/*
  $("#searchArea").keydown(function(event){
      if(event.keyCode == 13) {
        if($("#searchArea").val().length==0) {
            event.preventDefault();
            return false;
        }
        else{
          var index = score.length;
          var chord = $("#searchArea").val();
          addUnit();
          setChord(index, chord);
          renderScore();
          document.getElementById("searchArea").value = "";
          $(".ui-menu-item").hide();
        }
      }
  });
*/
  $(".basetree").click(function(){
    var match = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    trtemp = $(this).closest("tr");
    if (clickstate == false){
      chordname = $(this).attr('id');
      openDetails(chordname, trtemp);
      $(this).children("img").attr("src", "img/closeTr.png");
      $(this).children("img").attr("srcset", "img/closeTr@2x.png 2x, img/closeTr@3x.png 3x");
    }
    else{
      clickedchord = $(this).attr('id');
      if(chordname != clickedchord){
        $(".basetree").children("img").attr("src", "img/closeTr.png");
        $(".basetree").children("img").attr("srcset", "img/closeTr@2x.png 2x, img/closeTr@3x.png 3x");
        closeDetails();
        openDetails(clickedchord, trtemp);
        chordname = clickedchord;
      }
      else{
        closeDetails();
        console.log(chordname);
      }
      $(this).children("img").attr("src", "img/openTr.png");
      $(this).children("img").attr("srcset", "img/openTr@2x.png 2x, img/openTr@3x.png 3x");
    }
    var index = match.indexOf(chordname);
    console.log(index);
    $("#chordtreeDiv").scrollTop(69*index);

  });
  /* clicking for debug
  $(document).on('click', '.deeptree', function(){
    var str = $(this).find("p").text();
    var chord=str.split(" (")[0];
    console.log(chord);
    var index = score.length;
    addUnit();
    setChord(index, chord);
    renderScore();
    $("#scoreDiv").scrollTop($("#scoreDiv").prop("scrollHeight"));
    selected_units.splice(0, selected_units.length);

    closeDetails();
  })
*/
  function openDetails(chordname, trtemp){
    $("<tr><td class='deeptree' id='" + chordname + "dim' draggable='true' ondragstart='dragChord(event)'> <p class='chordname basetrees'>"+chordname+"dim"+"</p> <img src='img/empty.png' srcset='img/empty@2x.png 2x, img/empty@3x.png 3x' class='dragaffordance basetrees'> <img hidden src='img/draggable.png' srcset='img/draggable@2x.png 2x, img/draggable@3x.png 3x' class='dragaffordance2 basetrees'></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree' id='" + chordname + "aug' draggable='true' ondragstart='dragChord(event)'> <p class='chordname basetrees'>"+chordname+"aug"+"</p> <img src='img/empty.png' srcset='img/empty@2x.png 2x, img/empty@3x.png 3x' class='dragaffordance basetrees'> <img hidden src='img/draggable.png' srcset='img/draggable@2x.png 2x, img/draggable@3x.png 3x' class='dragaffordance2 basetrees'></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree' id='" + chordname + "sus4' draggable='true' ondragstart='dragChord(event)'> <p class='chordname basetrees'>"+chordname+"sus4"+"</p> <img src='img/empty.png' srcset='img/empty@2x.png 2x, img/empty@3x.png 3x' class='dragaffordance basetrees'> <img hidden src='img/draggable.png' srcset='img/draggable@2x.png 2x, img/draggable@3x.png 3x' class='dragaffordance2 basetrees'></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree' id='" + chordname + "M7' draggable='true' ondragstart='dragChord(event)'> <p class='chordname basetrees'>"+chordname+"M7"+"</p> <img src='img/empty.png' srcset='img/empty@2x.png 2x, img/empty@3x.png 3x' class='dragaffordance basetrees'> <img hidden src='img/draggable.png' srcset='img/draggable@2x.png 2x, img/draggable@3x.png 3x' class='dragaffordance2 basetrees'></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree' id='" + chordname + "m7' draggable='true' ondragstart='dragChord(event)'> <p class='chordname basetrees'>"+chordname+"m7"+"</p> <img src='img/empty.png' srcset='img/empty@2x.png 2x, img/empty@3x.png 3x' class='dragaffordance basetrees'> <img hidden src='img/draggable.png' srcset='img/draggable@2x.png 2x, img/draggable@3x.png 3x' class='dragaffordance2 basetrees'> </td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree' id='" + chordname + "7' draggable='true' ondragstart='dragChord(event)'> <p class='chordname basetrees'>"+chordname+"7"+"</p> <img src='img/empty.png' srcset='img/empty@2x.png 2x, img/empty@3x.png 3x' class='dragaffordance basetrees'> <img hidden src='img/draggable.png' srcset='img/draggable@2x.png 2x, img/draggable@3x.png 3x' class='dragaffordance2 basetrees'> </td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree' id='" + chordname + "m' draggable='true' ondragstart='dragChord(event)'> <p class='chordname basetrees'>"+chordname+"m"+"</p> <img src='img/empty.png' srcset='img/empty@2x.png 2x, img/empty@3x.png 3x' class='dragaffordance basetrees'> <img hidden src='img/draggable.png' srcset='img/draggable@2x.png 2x, img/draggable@3x.png 3x' class='dragaffordance2 basetrees'> </td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree' id='" + chordname + " (major)' draggable='true' ondragstart='dragChord(event)'> <p class='chordname basetrees'>"+chordname+" (major)"+"</p> <img src='img/empty.png' srcset='img/empty@2x.png 2x, img/empty@3x.png 3x' class='dragaffordance basetrees'><img hidden src='img/draggable.png' srcset='img/draggable@2x.png 2x, img/draggable@3x.png 3x' class='dragaffordance2 basetrees'> </td></tr>").insertAfter(trtemp);
    $('img').attr('draggable', 'false');
    clickstate = true;
    openChord = chordname;
  }

  $(document).on("mouseenter", ".deeptree", function(){
    console.log($(this));
    $(this).children("img").attr("src", "img/draggable.png");
    $(this).children("img").attr("srcset","img/draggable@2x.png 2x, img/draggable@3x.png 3x")


  })
  $(document).on("mouseleave", ".deeptree", function(){
    console.log($(this));
    $(this).children("img").attr("src", "img/empty.png");
    $(this).children("img").attr("srcset","img/empty@2x.png 2x, img/empty@3x.png 3x")

  })
  function closeDetails(){
    $(".deeptree").closest("tr").remove();
    clickstate = false;
  }
});

function dragChord(ev){
  let chordName = ev.target.id.split(" (")[0];
  ev.dataTransfer.setData("chordName", chordName);
}

function allowDrop(ev){
  ev.preventDefault();
  let index = ev.target.closest('.halfBar').id.replace("unit","") * 1;
  $("#unit"+index).css("background-color", "#F6F6F6");
  console.log(index);
}

function dropChord(ev){
  ev.preventDefault();
  let chordName = ev.dataTransfer.getData("chordName");
  let index = ev.target.closest('.halfBar').id.replace("unit","") * 1;
  setChord(index, chordName);
  renderScore();
  $("#chordText"+index).val(chordName);
}

function dragLeave(ev){
  ev.preventDefault();
  let index = ev.target.closest('.halfBar').id.replace("unit","") * 1;
  $("#unit"+index).css("background-color", "");
  console.log(index);
}
