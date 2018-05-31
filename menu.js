$(document).ready(function(){

    $("#invertChordButton").click(function(){
        //var index = score.length;
        $("#inversion0").prop('checked', true);
        console.log("invert");
        let modal = document.getElementById('myModal1');
        modal.style.display = "block";
        $("#importDiv").hide();
    });

    $("#changeRhythmButton").click(function(){
        $("#rhythm0").prop('checked', true);
        console.log("change rhythm");

        let modal = document.getElementById('myModal2');
        modal.style.display = "block";
        $("#importDiv").hide();
    });

    $("#insertBarAfterButton").click(function(){
        if(selected_units.length !== 0){
            selected_units.sort(function (a,b){
                return b-a;
            });
            console.log(selected_units);
            selected_units.forEach(function(value){
                insertUnit(value*1+1);
                console.log(value*1+1);
            });
            renderScore();
        }
    });

    $("#deleteChordsButton").click(function(){
        deleteChords();
    });

    $("#deleteBarsButton").click(function(){
        deleteUnits();
    });

    $("#addBarsButton").click(function(){
        addUnits();
        $("#scoreDiv").scrollTop($("#scoreDiv").prop("scrollHeight"));
        selected_units.splice(0, selected_units.length);
        renderScore();
        menuUpdate();
    });
});
