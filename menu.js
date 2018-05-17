$(document).ready(function(){

    $("#invertChordButton").click(function(){
        //var index = score.length;
        console.log("invert");
        selected_units.forEach(function(value){
            invertChord(value, 1);
            renderScore();
        });

        let modal = document.getElementById('myModal1');
        modal.style.display = "block";
        $("#importDiv").hide();
    });

    $("#changeRhythmButton").click(function(){
        let modal = document.getElementById('myModal2');
        modal.style.display = "block";
        $("#importDiv").hide();
    });

    $("#insertBarAfterButton").click(function(){
        if(selected_units.length != 0){
            selected_units.sort(function (a,b){
                return b-a;
            });
            console.log(selected_units);
            selected_units.forEach(function(value){
                insertUnit(value*1+1);
                console.log(value*1+1);
            });
            renderScore();
            selected_units.splice(0, selected_units.length);
        }
    });

    $("#deleteChordsButton").click(function(){
        if(selected_units.length != 0){

            selected_units.forEach(function(value){
                deleteChord(value);
            });
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
            });
            renderScore();
        }
        selected_units.splice(0, selected_units.length);
        menuUpdate();
    });

    $("#addBarsButton").click(function(){
        addUnit();
        renderScore();
        $("#scoreDiv").scrollTop($("#scoreDiv").prop("scrollHeight"));
        selected_units.splice(0, selected_units.length);
        menuUpdate();
    });
});
