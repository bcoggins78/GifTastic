$(document).ready(function () {

    // Array of TV Shows.
    var topics = ["Game of Thrones", "Stargate", "The IT Crowd", "Stranger Things", "The Walking Dead", "Dr. Who", "Red Dwarf", "The Expanse", "The Sopranos", "Sons of Anarchy", "Babylon 5", "Breaking Bad", "Band of Brothers", "The Punisher", "DareDevil", "Battlestar Galactica", "Fringe", "Cobra Kai", "Mr. Robot", "Star Trek", "The Office", "The Orville", "Family Guy", "Seinfield", "Voltron"]

    // Display buttons for tv shows
    var showButtons = function () {

        $("#tv-display").empty();

        for (var i = 0; i < topics.length; i++) {

            var newButton = $("<button>")
            newButton.attr("data-name", topics[i]);
            newButton.addClass("tvshow btn btn-info float-left");
            newButton.text(topics[i]);
            $("#tv-display").append(newButton);

        }
    }

    // Click event to add button and add new tvshow to the array
    $("#add-tv").on("click", function (event) {

        event.preventDefault();
        var tvShow = $("#tv-input").val().trim();
        topics.push(tvShow);
        console.log(topics);
        showButtons();

    });

    // API function to get JSON object and display the gif rating and picture on the DOM

    function displayGif() {
        $("#gif-display").empty(); //Clears any existing gifs from the DOM
        var gif = $(this).attr("data-name").replace(/ /g, '+'); //Creates variable with the value of the button clicked, spaces replaced with '+'
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=bDsYdUqI28OTcU8KKXSRfP6ppX68ZyXN&q=" + gif + "&limit=10";
        // Url the giphy API.  API key is included.  API will perform a search and return 10 results.

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {

                console.log("The Query URL is: " + queryURL);
                console.log(response);

                var results = response.data;  //Variable to hold the array of 10 objects returned from the API search.

                // For loop to cycle through the results array.
                for (var i = 0; i < results.length; i++) {


                    // Div, img, and p elements created. Attributes difined so the later if statement can change the animate / still state.
                    // Image and P elements appeneded to id gif-display.
                    var imageDiv = $("<div>");
                    // imageDiv.addClass("card-body");
                    var p = $("<p>").text("Rating: " + results[i].rating); 
                    // p.addClass("float-left");
                    var tvImage = $("<img>"); 
                    tvImage.attr("src", results[i].images.fixed_height_still.url); 
                    tvImage.attr("data-still", results[i].images.fixed_height_still.url); 
                    tvImage.attr("data-state", "still");
                    tvImage.addClass("tvshow-image"); 
                    tvImage.attr("data-animate", results[i].images.fixed_height.url);
                    imageDiv.addClass("float-left image-div");
                    imageDiv.append(p);
                    imageDiv.append(tvImage);
                    $("#gif-display").append(imageDiv);
                    
                }
            });
    }

    // Click event that checks if the current state is set to still, if it is then it will change to animate.
    // If it is set to animate then it will change to still.
    $(document).on("click", ".tvshow-image", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {

            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");

        }

        else {

            $(this).attr("src", $(this).data('still'));
            $(this).attr("data-state", "still");

        }

    });

    // Click event to call the displayGif function when the button with the .tvshow class is clicked
    $(document).on("click", ".tvshow", displayGif);


    // Creates button for the TV Shows
    showButtons();

});