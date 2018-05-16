$(document).ready(function(){
    var modal = document.getElementById('myModal');

// Get the button that opens the modal
    var btn = document.getElementById("changeRhythmButton");

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

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
});
