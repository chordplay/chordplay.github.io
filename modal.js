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
    }

	cancel2.onclick = function() {
        modal2.style.display = "none";
        $("#importDiv").show();
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
