var AllChord = ["C", "Cm", "C7", "Cm7", "CM7", "Csus4", "Caug", "Cdim",
      "C#", "C#m", "C#7", "C#m7", "C#M7", "C#sus4", "C#aug", "C#dim",
      "Db", "Dbm", "Db7", "Dbm7", "DbM7", "Dbsus4", "Dbaug", "Dbdim",

      "D", "Dm", "D7", "Dm7", "DM7", "Dsus4", "Daug", "Ddim",
      "D#", "D#m", "D#7", "D#m7", "D#M7", "D#sus4", "D#aug", "D#dim",
      "D#", "D#m", "D#7", "D#m7", "D#M7", "D#sus4", "D#aug", "D#dim",
      "Eb", "Ebm", "Eb7", "Ebm7", "EbM7", "Ebsus4", "Ebaug", "Ebdim",
      "E", "Em", "E7", "Em7", "EM7", "Esus4", "Eaug", "Edim",
      "F", "Fm", "F7", "Fm7", "FM7", "Fsus4", "Faug", "Fdim",
    "F#", "F#m", "F#7", "F#m7", "F#M7", "F#sus4", "F#aug", "F#dim",
    "G", "Gm", "G7", "Gm7", "GM7", "Gsus4", "Gaug", "Gdim",
    "G#", "G#m", "G#7", "G#m7", "G#M7", "G#sus4", "G#aug", "G#dim",
    "Ab", "Abm", "Ab7", "Abm7", "AbM7", "Absus4", "Abaug", "Abdim",
    "A", "Am", "A7", "Am7", "AM7", "Asus4", "Aaug", "Adim",
    "A#", "A#m", "A#7", "A#m7", "A#M7", "A#sus4", "A#aug", "A#dim",
    "Bb", "Bbm", "Bb7", "Bbm7", "BbM7", "Bbsus4", "Bbaug", "Bbdim",
    "B", "Bm", "B7", "Bm7", "BM7", "Bsus4", "Baug", "Bdim",
  ];

var chordDragging = false;

$(document).ready(function(){

  var clickstate = false;
  var chordname;
  var trtemp;

  $("#searchArea").autocomplete(
    {minLength: 1}, {source: AllChord},
    {select: function(event, ui){
      var chord = ui.item.value
      $("#searchArea").val(ui.item.value);
      event.preventDefault();
      var index = score.length;
      addUnit();
      setChord(index, chord);
      renderScore();
      document.getElementById("searchArea").value = "";
    }}
  )
  $.ui.autocomplete.filter = function (array, term) {
    var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
    return $.grep(array, function (value) {
      return matcher.test(value.label || value.value || value);
    });
  };
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
  $(".basetree").click(function(){
    trtemp = $(this).closest("tr");
    if (clickstate == false){
      chordname = $(this).attr('id');
      openDetails(chordname, trtemp);
    }
    else{
      clickedchord = $(this).attr('id');
      if(chordname != clickedchord){
        closeDetails();
        openDetails(clickedchord, trtemp);
        chordname = clickedchord;
      }
      else{
        closeDetails();
      }
    }
  });

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
  })

  function openDetails(chordname, trtemp){
    $("<tr><td class='deeptree' id='" + chordname + "dim' draggable='true' ondragstart='dragChord(event)'> <p class='chordname'>"+chordname+"dim"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree' id='" + chordname + "aug' draggable='true' ondragstart='dragChord(event)'> <p class='chordname'>"+chordname+"aug"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree' id='" + chordname + "sus4' draggable='true' ondragstart='dragChord(event)'> <p class='chordname'>"+chordname+"sus4"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree' id='" + chordname + "M7' draggable='true' ondragstart='dragChord(event)'> <p class='chordname'>"+chordname+"M7"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree' id='" + chordname + "m7' draggable='true' ondragstart='dragChord(event)'> <p class='chordname'>"+chordname+"m7"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree' id='" + chordname + "7' draggable='true' ondragstart='dragChord(event)'> <p class='chordname'>"+chordname+"7"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree' id='" + chordname + "m' draggable='true' ondragstart='dragChord(event)'> <p class='chordname'>"+chordname+"m"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree' id='" + chordname + " (major)' draggable='true' ondragstart='dragChord(event)'> <p class='chordname'>"+chordname+" (major)"+"</p></td></tr>").insertAfter(trtemp);

    clickstate = true;

  }

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
  console.log("ALLOWDROP");
}

function dropChord(ev){
  ev.preventDefault();
  let chordName = ev.dataTransfer.getData("chordName");
  let index = ev.target.closest('.halfBar').id.replace("unit","") * 1;
  setChord(index, chordName);
  renderScore();
  $("#chordText"+index).val(chordName);

}
