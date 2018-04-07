// Javascript for Homework 6 - Giphy Exercise

var cartoon = ["The Simpsons","Bugs Bunny","The Flintstones","Donald Duck"];



function makeButtons() {
    $("#button-area").empty();
    for (var i = 0; i < cartoon.length; i++) {
        var temp1 = $("<button>");
        temp1.addClass("cartoons");
        temp1.attr("item-name", cartoon[i]);
        temp1.text(cartoon[i]);
        $("#button-area").append(temp1);
        }   
    };


$("#add-button").on("click", function (event) {
    event.preventDefault();
    var temp2 = $("#cartoon-input").val().trim();
    cartoon.push(temp2);
    makeButtons();
    $("#cartoon-input").val("");
});


$(document).on("click", ".cartoons", function() {

    var selection = $(this).attr("item-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selection + "&api_key=MOBBQVEBv2WjPT3Q7ulmiZ8SrDSO1zli&limit=12";
    console.log(selection)
    
    $.ajax( {
    url: queryURL,
    method: "GET"
    })
    .then(function(response) {
    console.log(response);
    var results = response.data;
    $("#gif-area").html("");
    for (var i = 0; i < results.length; i++) {
        var animatedImage = results[i].images.downsized.url;
        var stillImage = results[i].images.downsized_still.url;
        console.log(stillImage);

        var tempDiv = $("<div class='item'>");
        var cartoonImage = $("<img>");
        cartoonImage.attr("src", stillImage);
        cartoonImage.attr("class", "gif");
        cartoonImage.attr("data-still", stillImage);
        cartoonImage.attr("data-animate", animatedImage);
        cartoonImage.attr("data-state", $(cartoonImage).attr("src"));        
        cartoonImage.attr("id", "gif-display")
        tempDiv.append(cartoonImage);
        $("#gif-area").append(tempDiv);
        }
    })
 });

 $(document).on("click", ".gif", function(e) {
    //  console.log(e.target);

     var state = $(this).attr("data-state");
     var still = $(this).attr("data-still");
     var animated = $(this).attr("data-animate");
    if (state === still) {
        $(this).attr("src", animated);
        $(this).attr("data-state", animated);
    }  
    else {
        $(this).attr("src", still);
        $(this).attr("data-state", still);
    }
 });

makeButtons();