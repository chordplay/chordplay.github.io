$(document).ready(function(){
    var modal1 = document.getElementById('myModal1');
	  var modal2 = document.getElementById('myModal2');


// Get the <span> element that closes the modal
    var cancel1 = document.getElementById("cancel1");
    var cancel2 = document.getElementById("cancel2");

// When the user clicks on <span> (x), close the modal
    cancel1.onclick = function() {
        modal1.style.display = "none";
        $("#importDiv").show();
        selected_units=[];
        renderScore();
    }

	  cancel2.onclick = function() {
        modal2.style.display = "none";
        $("#importDiv").show();
        selected_units=[];
        renderScore();
    }

    var select1 = document.getElementById("select1");
    var select2 = document.getElementById("select2");
    select1.onclick = function(){
      var inversiontype = $(".inversionset:checked").val();

      selected_units.forEach(function(value){
          invertChord(value, inversiontype);
          renderScore();
      });
      selected_units.splice(0, selected_units.length);
      modal1.style.display = "none";
      $("#importDiv").show();
      selected_units = [];
      renderScore();
      menuUpdate();
    }

    select2.onclick = function(){
      var rhythmtype = $(".rhythmset:checked").val();

      selected_units.forEach(function(value){
        changeRhythm(value, rhythmtype);
        renderScore();
      })
      selected_units.splice(0, selected_units.length);
      modal2.style.display = "none";
      $("#importDiv").show();
      selected_units = [];
      renderScore();
      menuUpdate();
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal1) {
            modal1.style.display = "none";
            $("#importDiv").show();
        } else if (event.target == modal2) {
            modal2.style.display = "none";
            $("#importDiv").show();
        }
    }
});
