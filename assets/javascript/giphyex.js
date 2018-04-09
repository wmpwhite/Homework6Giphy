// Javascript for Homework 6 - Giphy Exercise

// variable array to hold initial button information and to receive input of additional new buttons
var cartoon = ["Sponge Bob","The Simpsons","Bugs Bunny","Fred Flintstone","Donald Duck","Rugrats","Tom and Jerry","Yosemite Sam","Mickey Mouse","Popeye"];

// this function renders buttons for each item in the variable array "cartoons"
function makeButtons() {
    // following line ensures display area is cleared before rendering buttons
    $("#button-area").empty();
    // loops through the cartoon[i] array
    for (var i = 0; i < cartoon.length; i++) {
        // creates a temporary variable with the html tag of button
        var temp1 = $("<button>");
        // the following three lines assign attributes and content to the new button
        temp1.addClass("cartoons");
        temp1.attr("item-name", cartoon[i]);
        temp1.text(cartoon[i]);
        // appends the temp variable to the button display area as a new button
        $("#button-area").append(temp1);
        }   
    };

// This section initiates on a click of the "make a abutton" button
$("#add-button").on("click", function (event) {
    // prevents potential processing error by disabling the normal function (submit) of the form input button 
    event.preventDefault();
    // takes text from the input form and pushes it into the cartoon variable array
    var temp2 = $("#cartoon-input").val().trim();
    cartoon.push(temp2);
    // calls the function to re-render buttons with new item included in variable array
    makeButtons();
    //clear the form text box
    $("#cartoon-input").val("");
});

// This section initiates on a click on one of the rendered buttons
$(document).on("click", ".cartoons", function() {

    // next two lines create the API query structure
    var selection = $(this).attr("item-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selection + "&api_key=MOBBQVEBv2WjPT3Q7ulmiZ8SrDSO1zli&limit=12";
    
    // initiates query to extract dat from API
    $.ajax( {
    url: queryURL,
    method: "GET"    
    })
    // the following section initiates upon return of data from API
    .then(function(response) {
    // create a variable to store object information returned from API
    var results = response.data;
    // makes sure that the area where the gif display is cleared before being populated in response to the button click
    $("#gif-area").html("");
    // loop to append gifs to gif display area of page
    for (var i = 0; i < results.length; i++) {
        // creates variables to store information for still and animated versions of each gif
        var animatedImage = results[i].images.fixed_height_downsampled.url;
        var stillImage = results[i].images.fixed_height_still.url;
        // create a temporary div to hold image information
        var tempDiv = $("<div class='item'>");
        // create a variable "cartoonImage) with the html tag of img
        var cartoonImage = $("<img>");
        // sets initial source of image to still version
        cartoonImage.attr("src", stillImage);
        // the next five lines attach attributes to the image tag
        cartoonImage.attr("class", "gif");
        cartoonImage.attr("data-still", stillImage);
        cartoonImage.attr("data-animate", animatedImage);
        // sets initial data-state to the address of the still image 
        cartoonImage.attr("data-state", $(cartoonImage).attr("src"));             
        cartoonImage.attr("id", "gif-display")
        // appends the current cartoonImage
        tempDiv.append(cartoonImage);
        // appends the temporary div to the div holding the gif display area
        $("#gif-area").append(tempDiv);
        }
    })
 });

//  click event to toggle between still and animated versions of gifs
$(document).on("click", ".gif", function(e) {
    // creates a variable to hold  current state (still or animated) and sets it to initial "data-state" which is the url of the still image
    var state = $(this).attr("data-state");
    // creates a variable to hold the url of the still image
    var still = $(this).attr("data-still");
    // creates a variable to hold the url of the animated gif
    var animated = $(this).attr("data-animate");
    // checks the current state to see if it is set to the still image url
    if (state === still) {
        // if true the following two lines switch the image to the animated version and reset the current "data-state" to the url of the animated gif
        $(this).attr("src", animated);
        $(this).attr("data-state", animated);
    }
        // if condition returns false the following sets the current image to the still version and resets the current "data-state" to still image
    else {
        $(this).attr("src", still);
        $(this).attr("data-state", still);
    }
 });

//  After page loads, this calls the makeButtons function to render initial set of buttons based on content of "cartoon" variable array 
makeButtons();