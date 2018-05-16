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
  ]

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
  })

  $("#invertChordButton").click(function(){
    if(selected_units.length != 0){
      //var index = score.length;
      selected_units.forEach(function(value){
        invertChord(value, 1);
        renderScore();
      })
      selected_units.splice(0, selected_units.length);
    }
  })

  $("#changeRhythmButton").click(function(){

  })

  $("#insertBarAfterButton").click(function(){
    if(selected_units.length != 0){
      selected_units.sort(function (a,b){
        return b-a;
      });
      console.log(selected_units);
      selected_units.forEach(function(value){
        insertUnit(value*1+1);
        console.log(value*1+1);
      })
      renderScore();
      selected_units.splice(0, selected_units.length);
    }
  })

  $("#deleteChordsButton").click(function(){
    if(selected_units.length != 0){

      selected_units.forEach(function(value){
        deleteChord(value);
      })
      renderScore();
      selected_units.splice(0, selected_units.length);
    }
    menuUpdate();
  });

  $("#deleteBarsButton").click(function(){
    if(selected_units.length != 0){
      selected_units.sort(function (a,b){
        return b-a;
      });
      selected_units.forEach(function(value){
        deleteUnit(value);
      })
      renderScore();
    }
    selected_units.splice(0, selected_units.length);
    menuUpdate();
  });

  $("#addBarsButton").click(function(){
    addUnit();
    renderScore();
    if($(this).hasClass("pointer")){
      $(this).removeClass("pointer");
    }
    selected_units.splice(0, selected_units.length);
    menuUpdate();
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
    $("<tr><td class='deeptree'> <p class='chordname'>"+chordname+"dim"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree'> <p class='chordname'>"+chordname+"aug"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree'> <p class='chordname'>"+chordname+"sus4"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree'> <p class='chordname'>"+chordname+"M7"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree'> <p class='chordname'>"+chordname+"m7"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree'> <p class='chordname'>"+chordname+"7"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree'> <p class='chordname'>"+chordname+"m"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree'> <p class='chordname'>"+chordname+" (major)"+"</p></td></tr>").insertAfter(trtemp);

    clickstate = true;
  }

  function closeDetails(){
    $(".deeptree").closest("tr").remove();
    clickstate = false;
  }

/*------------------*/

  $("#invertChordButton, #changeRhythmButton, #deleteChordsButton, #deleteBarsButton").mouseover(function(){
    if(selected_units.length != 0){
      $(this).addClass("pointer");
    }
  })

  $("#addBarsButton").mouseover(function(){
    $(this).addClass("pointer");
  })

  $("#insertBarAfterButton").mouseover(function(){
    if(selected_units.length != 0){
      $(this).addClass("pointer");
    }
  })

/*-------------------------*/
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById("changeRhythmButton");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function() {
      modal.style.display = "block";
      $("#importDiv").hide();
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
      $("#importDiv").show();
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
          $("#importDiv").show();
      }
  }
})
