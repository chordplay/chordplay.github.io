$(document).ready(function () {
    let modal1 = document.getElementById('myModal1');
    let modal2 = document.getElementById('myModal2');

    // Get the <span> element that closes the modal
    let cancel1 = document.getElementById("cancel1");
    let cancel2 = document.getElementById("cancel2");

    let select1 = document.getElementById("select1");
    let select2 = document.getElementById("select2");

    // When the user clicks on <span> (x), close the modal
    cancel1.onclick = function () {
        modal1.style.display = "none";
        $("#importDiv").show();
        selected_units = [];
        renderScore();
    };

    cancel2.onclick = function () {
        modal2.style.display = "none";
        $("#importDiv").show();
        selected_units = [];
        renderScore();
    };

    select1.onclick = function () {
        let inversiontype = $(".inversionset:checked").val();

        invertChords(inversiontype);
        // selected_units.forEach(index => invertChord(index, inversiontype));
        modal1.style.display = "none";
        $("#importDiv").show();
        renderScore();
        menuUpdate();
    };

    select2.onclick = function () {
        let rhythmtype = $(".rhythmset:checked").val();
        changeRhythms(rhythmtype);
        // selected_units.forEach(index => changeRhythm(index, rhythmtype));
        modal2.style.display = "none";
        $("#importDiv").show();
        renderScore();
        menuUpdate();
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target === modal1) {
            modal1.style.display = "none";
            $("#importDiv").show();
        } else if (event.target === modal2) {
            modal2.style.display = "none";
            $("#importDiv").show();
        }
    }
});
