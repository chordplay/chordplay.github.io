$(document).ready(function(){
  console.log("ready");

  var clickstate = false;
  var chordname;
  var trtemp;



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

  function openDetails(chordname, trtemp){

    $("<tr><td class='deeptree'><p class='chordname'>"+chordname+"dim"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree'><p class='chordname'>"+chordname+"aug"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree'><p class='chordname'>"+chordname+"sus4"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree'><p class='chordname'>"+chordname+"M7"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree'><p class='chordname'>"+chordname+"m7"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree'><p class='chordname'>"+chordname+"7"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree'><p class='chordname'>"+chordname+"m"+"</p></td></tr>").insertAfter(trtemp);
    $("<tr><td class='deeptree'><p class='chordname'>"+chordname+" (major)"+"</p></td></tr>").insertAfter(trtemp);

    clickstate = true;
  }

  function closeDetails(){

    $(".deeptree").closest("tr").remove();
    clickstate = false;
  }

  $(".deeptree").on('click', function(){
      console.log("Asdf");
  })
})
