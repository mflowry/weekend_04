$(document).ready(function(){

    //submit form contents to create new movie
    $('form').on('submit', function(e){
        console.log("submitting");
        $(this)=$('this');
        e.preventDefault();
        //capture each field (fname, lname) to a variable name
        var title = $(this).serializeArray()[0].value;
        var runtime = $(this).serializeArray()[1].value;
        var rating= $(this).serializeArray()[2].value;
        var data = {//set up the data object to be posted
            title: title,
            runtime: runtime,
            rating: rating
        };
        console.log(data);
        $.ajax({
            url: '/users',
            type: 'POST',
            data: data//send the data packet we just made
        }).done(function(response, textStatus, jqXHR){
            console.log('Success!');
        }).fail(function( jqXHR, textStatus, errorThrown ) {
            console.log(jqXHR, textStatus, errorThrown);
        }).always(function(){
            console.log('Ajax Complete!');
        });
    })
});