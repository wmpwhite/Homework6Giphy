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
});


// $(".cartoons").on("click", function() {

    // var selection = $(this).attr("item-name");
    // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selection + "&api_key=MOBBQVEBv2WjPT3Q7ulmiZ8SrDSO1zli&limit=12";
    // console.log(selection)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=the+flinstones&api_key=MOBBQVEBv2WjPT3Q7ulmiZ8SrDSO1zli&limit=12"

    $.ajax( {
    url: queryURL,
    method: "GET"
    })
    .then(function(response) {
    console.log(response);
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
        tempDiv = $("<div class='item'>");
        var cartoonImage = $("<img>");
        cartoonImage.attr("src", results[i].images.fixed_height_still.url);
        cartoonImage.attr("id" , "gif-display")
        tempDiv.append(cartoonImage);
        $("#gif-area").prepend(tempDiv);
        }
    });
// });







makeButtons();