// Wait until the webpage has completely loaded
$(document).ready(function () {

    // jQuery click event
    // Hide the message when the Hide Message button is clicked
    $("#hideButton").click(function () {

        // fadeOut is a jQuery effect
        $("#message").fadeOut(1000);

    });

    // jQuery click event
    // Show the message when the Show Message button is clicked
    $("#showButton").click(function () {

        // fadeIn is a jQuery effect
        $("#message").fadeIn(1000);

    });

});